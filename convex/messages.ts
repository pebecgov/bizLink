import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// ==================== MESSAGING ====================

export const sendMessage = mutation({
    args: {
        conversationId: v.id("conversations"),
        content: v.string(),
        type: v.optional(v.union(
            v.literal("text"),
            v.literal("milestone_proposal"),
            v.literal("document_request"),
            v.literal("system")
        )),
        metadata: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) throw new Error("Conversation not found");

        if (!conversation.participantIds.includes(identity.subject)) {
            throw new Error("Unauthorized");
        }

        const messageId = await ctx.db.insert("messages", {
            conversationId: args.conversationId,
            senderId: identity.subject,
            content: args.content,
            type: args.type || "text",
            metadata: args.metadata,
            createdAt: Date.now(),
        });

        await ctx.db.patch(args.conversationId, { lastMessageAt: Date.now() });

        // Update connection last activity
        await ctx.db.patch(conversation.connectionId, { lastActivity: Date.now() });

        return messageId;
    },
});

export const getMessages = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversationId))
            .order("asc")
            .collect();
    },
});

export const getConversation = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) return null;

        const connection = await ctx.db.get(conversation.connectionId);

        return {
            ...conversation,
            connectionStatus: connection?.status,
        };
    },
});

export const getMilestone = query({
    args: { milestoneId: v.id("milestones") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.milestoneId);
    },
});

// ==================== MILESTONES ====================

export const proposeMilestone = mutation({
    args: {
        connectionId: v.id("connections"),
        title: v.string(),
        description: v.string(),
        deadline: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const connection = await ctx.db.get(args.connectionId);
        if (!connection) throw new Error("Connection not found");

        const milestoneId = await ctx.db.insert("milestones", {
            connectionId: args.connectionId,
            title: args.title,
            description: args.description,
            deadline: args.deadline,
            status: "proposed",
            proposedBy: identity.subject,
        });

        // Automatically send a system message in the chat
        const conversation = await ctx.db
            .query("conversations")
            .withIndex("by_connectionId", (q) => q.eq("connectionId", args.connectionId))
            .first();

        if (conversation) {
            await ctx.db.insert("messages", {
                conversationId: conversation._id,
                senderId: identity.subject,
                content: `Proposed milestone: ${args.title}`,
                type: "milestone_proposal",
                metadata: { milestoneId },
                createdAt: Date.now(),
            });
        }

        return milestoneId;
    },
});

export const agreeToMilestone = mutation({
    args: { milestoneId: v.id("milestones") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const milestone = await ctx.db.get(args.milestoneId);
        if (!milestone) throw new Error("Milestone not found");

        if (milestone.proposedBy === identity.subject) {
            throw new Error("You cannot agree to your own proposal");
        }

        await ctx.db.patch(args.milestoneId, {
            status: "agreed",
            agreedBy: identity.subject,
        });

        // Check if connection should transition to 'contract'
        // If at least one milestone is agreed, we move to contract status? 
        // Or all proposed milestones must be agreed? Let's say any agreement moves it to 'contract'.
        const connection = await ctx.db.get(milestone.connectionId);
        if (connection && connection.status === "connected") {
            await ctx.db.patch(milestone.connectionId, { status: "contract", lastActivity: Date.now() });
        }

        return args.milestoneId;
    },
});

export const completeMilestone = mutation({
    args: { milestoneId: v.id("milestones") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const milestone = await ctx.db.get(args.milestoneId);
        if (!milestone) throw new Error("Milestone not found");

        await ctx.db.patch(args.milestoneId, {
            status: "completed",
            completedAt: Date.now(),
        });

        // Check if all milestones are completed to close the connection
        const allMilestones = await ctx.db
            .query("milestones")
            .withIndex("by_connectionId", (q) => q.eq("connectionId", milestone.connectionId))
            .collect();

        const allCompleted = allMilestones.every(m => m.status === "completed");
        if (allCompleted && allMilestones.length > 0) {
            await ctx.db.patch(milestone.connectionId, { status: "closed", lastActivity: Date.now() });
        }

        return args.milestoneId;
    },
});

export const requestExtension = mutation({
    args: {
        milestoneId: v.id("milestones"),
        reason: v.string(),
        newDeadline: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const milestone = await ctx.db.get(args.milestoneId);
        if (!milestone) throw new Error("Milestone not found");

        return await ctx.db.insert("milestone_extensions", {
            milestoneId: args.milestoneId,
            requestedBy: identity.subject,
            reason: args.reason,
            newDeadline: args.newDeadline,
            previousDeadline: milestone.deadline,
            status: "pending",
            createdAt: Date.now(),
        });
    },
});

export const approveExtension = mutation({
    args: { extensionId: v.id("milestone_extensions") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const extension = await ctx.db.get(args.extensionId);
        if (!extension) throw new Error("Extension not found");

        if (extension.requestedBy === identity.subject) {
            throw new Error("You cannot approve your own extension request");
        }

        await ctx.db.patch(args.extensionId, { status: "approved" });
        await ctx.db.patch(extension.milestoneId, { deadline: extension.newDeadline });

        return args.extensionId;
    },
});

export const requestDocument = mutation({
    args: {
        conversationId: v.id("conversations"),
        documentType: v.string(), // "NDA", "Tax Clearance", etc.
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        await ctx.db.insert("messages", {
            conversationId: args.conversationId,
            senderId: identity.subject,
            content: `Requested document: ${args.documentType}`,
            type: "document_request",
            metadata: {
                documentType: args.documentType,
                description: args.description,
                status: "pending"
            },
            createdAt: Date.now(),
        });
    },
});

export const submitDocument = mutation({
    args: {
        messageId: v.id("messages"),
        documentUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const message = await ctx.db.get(args.messageId);
        if (!message || message.type !== "document_request") {
            throw new Error("Invalid document request");
        }

        await ctx.db.patch(args.messageId, {
            metadata: {
                ...message.metadata,
                documentUrl: args.documentUrl,
                status: "submitted",
                submittedAt: Date.now()
            },
        });

        // Add a follow-up message
        await ctx.db.insert("messages", {
            conversationId: message.conversationId,
            senderId: identity.subject,
            content: `Submitted: ${message.metadata.documentType}`,
            type: "text",
            createdAt: Date.now(),
        });
    },
});

export const verifyDocument = mutation({
    args: { messageId: v.id("messages"), approved: v.boolean() },
    handler: async (ctx, args) => {
        const message = await ctx.db.get(args.messageId);
        if (!message) throw new Error("Message not found");

        await ctx.db.patch(args.messageId, {
            metadata: {
                ...message.metadata,
                status: args.approved ? "verified" : "rejected",
                verifiedAt: Date.now()
            },
        });
    },
});
