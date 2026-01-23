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
            v.literal("system"),
            v.literal("milestone_proposal"),
            v.literal("document_request")
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

        // Send notification to recipient
        const recipientId = conversation.participantIds.find(id => id !== identity.subject);
        if (recipientId) {
            const senderUser = await ctx.db
                .query("users")
                .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
                .first();

            await ctx.db.insert("notifications", {
                userId: recipientId,
                type: "message",
                title: "New Message",
                message: `${senderUser?.email || "Someone"} sent you a message: ${args.content.slice(0, 50)}${args.content.length > 50 ? "..." : ""}`,
                isRead: false,
                link: `/dashboard/messages/active/${args.conversationId}`,
                createdAt: Date.now(),
            });
        }

        return messageId;
    },
});

export const getMessages = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const messages = await ctx.db
            .query("messages")
            .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversationId))
            .order("asc")
            .collect();

        // Resolve storage IDs in metadata
        return await Promise.all(messages.map(async (msg) => {
            if (msg.metadata?.documentUrl) {
                // Only resolve if it's not already a URL (Legacy/Mock support)
                if (!msg.metadata.documentUrl.includes("://")) {
                    const resolvedUrl = await ctx.storage.getUrl(msg.metadata.documentUrl);
                    if (resolvedUrl) {
                        return {
                            ...msg,
                            metadata: { ...msg.metadata, documentUrl: resolvedUrl }
                        };
                    }
                }
            }
            return msg;
        }));
    },
});

export const getConversation = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) return null;

        return conversation;
    },
});

export const getMyConversations = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const conversations = await ctx.db
            .query("conversations")
            .collect();

        const myConversations = conversations.filter(c =>
            c.participantIds.includes(identity.subject)
        );

        return await Promise.all(myConversations.map(async (conv) => {
            const partnerId = conv.participantIds.find(id => id !== identity.subject);
            let partnerName = "Other User";
            let business = null;

            if (partnerId) {
                // Try to find if the partner is a business owner
                business = await ctx.db
                    .query("businesses")
                    .withIndex("by_ownerId", (q) => q.eq("ownerId", partnerId))
                    .first();

                if (business) {
                    partnerName = business.businessName;
                } else {
                    // Try to find by user email
                    const user = await ctx.db
                        .query("users")
                        .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
                        .first();
                    if (user) partnerName = user.email;
                }
            }

            return {
                ...conv,
                partnerName,
                business,
            };
        }));
    },
});

export const getOrCreateConversation = mutation({
    args: { participantId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        if (identity.subject === args.participantId) {
            throw new Error("Cannot message yourself");
        }

        // Check if conversation already exists
        const existing = await ctx.db
            .query("conversations")
            .collect();

        const conversation = existing.find(c =>
            c.participantIds.includes(identity.subject) &&
            c.participantIds.includes(args.participantId)
        );

        if (conversation) return conversation._id;

        // Create new conversation
        return await ctx.db.insert("conversations", {
            participantIds: [identity.subject, args.participantId],
            lastMessageAt: Date.now(),
        });
    },
});



