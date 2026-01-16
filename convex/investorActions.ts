import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ==================== SAVED SEARCHES ====================

export const saveSearch = mutation({
    args: {
        name: v.string(),
        criteria: v.object({
            keywords: v.optional(v.string()),
            location: v.optional(v.string()),
            sector: v.optional(v.string()),
            businessStage: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        return await ctx.db.insert("saved_searches", {
            userId: identity.subject,
            name: args.name,
            criteria: args.criteria,
            createdAt: Date.now(),
        });
    },
});

export const getSavedSearches = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        return await ctx.db
            .query("saved_searches")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .order("desc")
            .collect();
    },
});

export const deleteSavedSearch = mutation({
    args: { id: v.id("saved_searches") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const search = await ctx.db.get(args.id);
        if (!search || search.userId !== identity.subject) {
            throw new Error("Not authorized");
        }

        await ctx.db.delete(args.id);
    },
});

// ==================== SAVED BUSINESSES (WATCHLIST) ====================

export const toggleSaveBusiness = mutation({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const existing = await ctx.db
            .query("saved_businesses")
            .withIndex("by_user_business", (q) =>
                q.eq("userId", identity.subject).eq("businessId", args.businessId)
            )
            .unique();

        if (existing) {
            await ctx.db.delete(existing._id);
            return false; // Removed
        } else {
            await ctx.db.insert("saved_businesses", {
                userId: identity.subject,
                businessId: args.businessId,
                savedAt: Date.now(),
            });
            return true; // Saved
        }
    },
});

export const getSavedBusinesses = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const savedItems = await ctx.db
            .query("saved_businesses")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .order("desc")
            .collect();

        // Fetch actual business details
        const businesses = await Promise.all(
            savedItems.map(async (item) => {
                const business = await ctx.db.get(item.businessId);
                return { ...business, savedAt: item.savedAt };
            })
        );

        return businesses.filter(b => b?._id); // Filter out any nulls if business was deleted
    },
});

export const isBusinessSaved = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;

        const existing = await ctx.db
            .query("saved_businesses")
            .withIndex("by_user_business", (q) =>
                q.eq("userId", identity.subject).eq("businessId", args.businessId)
            )
            .unique();

        return !!existing;
    },
});
