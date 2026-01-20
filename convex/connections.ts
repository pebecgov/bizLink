import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";

/**
 * Initiate a connection (transitions match to 'lead')
 */
export const initiateConnection = mutation({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(args.businessId);
        if (!business) throw new Error("Business not found");

        // Check if connection already exists
        const existing = await ctx.db
            .query("connections")
            .withIndex("by_investor_business", (q) =>
                q.eq("investorId", identity.subject).eq("businessId", args.businessId)
            )
            .first();

        if (existing) return existing._id;

        // Create connection as 'lead'
        const connectionId = await ctx.db.insert("connections", {
            investorId: identity.subject,
            businessId: args.businessId,
            status: "lead",
            lastActivity: Date.now(),
            createdAt: Date.now(),
        });

        // Update match status if it exists
        const match = await ctx.db
            .query("matches")
            .withIndex("by_investor_business", (q) =>
                q.eq("investorId", identity.subject).eq("businessId", args.businessId)
            )
            .first();

        if (match) {
            await ctx.db.patch(match._id, { status: "contacted", updatedAt: Date.now() });
        }

        return connectionId;
    },
});

/**
 * Respond to a connection (transitions 'lead' to 'connected')
 * This creates the conversation.
 */
export const respondToConnection = mutation({
    args: { connectionId: v.id("connections") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const connection = await ctx.db.get(args.connectionId);
        if (!connection) throw new Error("Connection not found");
        if (connection.status !== "lead") return connection._id;

        const business = await ctx.db.get(connection.businessId);
        if (!business) throw new Error("Business not found");

        // Only the business owner can respond to a lead initiated by an investor
        // OR the investor can respond if it was the business who reached out (future proofing)
        // For now, let's assume investor initiates -> business responds
        if (business.ownerId !== identity.subject && connection.investorId !== identity.subject) {
            throw new Error("Unauthorized");
        }

        // Transition to 'connected'
        await ctx.db.patch(args.connectionId, {
            status: "connected",
            lastActivity: Date.now(),
        });

        // Create conversation
        await ctx.db.insert("conversations", {
            connectionId: args.connectionId,
            participantIds: [connection.investorId, business.ownerId],
            lastMessageAt: Date.now(),
        });

        return args.connectionId;
    },
});

export const getMyConnections = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        // Check if user is investor or business owner
        const investorConnections = await ctx.db
            .query("connections")
            .withIndex("by_investorId", (q) => q.eq("investorId", identity.subject))
            .collect();

        // Get businesses owned by user to find business-side connections
        const myBusinesses = await ctx.db
            .query("businesses")
            .withIndex("by_ownerId", (q) => q.eq("ownerId", identity.subject))
            .collect();
        const myBusinessIds = myBusinesses.map(b => b._id);

        const businessConnections = await Promise.all(
            myBusinessIds.map(async (id) => {
                return await ctx.db
                    .query("connections")
                    .withIndex("by_businessId", (q) => q.eq("businessId", id))
                    .collect();
            })
        );

        const allConnections = [...investorConnections, ...businessConnections.flat()];

        // Enrich with business/investor details
        return await Promise.all(allConnections.map(async (conn) => {
            const business = await ctx.db.get(conn.businessId);
            const investorProfile = await ctx.db
                .query("investor_profiles")
                .withIndex("by_userId", (q) => q.eq("userId", conn.investorId))
                .first();

            return {
                ...conn,
                business,
                investorProfile
            };
        }));
    },
});
