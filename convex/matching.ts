import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRecommendedInvestors = query({
    args: {
        searchQuery: v.optional(v.string()),
        type: v.optional(v.string()), // "Venture Capital", "Angel", etc. - currently not in schema but keeping arg for future or if we can filter by something else
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        // Fetch all investor profiles
        // In a real app we might want to filter server side more aggressively
        const investors = await ctx.db.query("investor_profiles").collect();

        // Basic client-side-like filtering on the server for now
        let filtered = investors;

        if (args.searchQuery) {
            const lowerQuery = args.searchQuery.toLowerCase();
            filtered = filtered.filter(inv =>
                (inv.registeredName?.toLowerCase()?.includes(lowerQuery)) ||
                (inv.sectors.some(s => s.toLowerCase().includes(lowerQuery))) ||
                (inv.jurisdiction?.toLowerCase()?.includes(lowerQuery))
            );
        }

        // Map to the frontend format
        return filtered.map(inv => ({
            id: inv._id,
            name: inv.registeredName || "Unknown Investor",
            type: "Investor", // Schema doesn't have type yet, defaulting
            location: inv.jurisdiction || (inv.locations && inv.locations.length > 0 ? `${inv.locations[0].state}, ${inv.locations[0].lga}` : "Unknown Location"),
            focus: inv.sectors,
            matchScore: Math.floor(Math.random() * (99 - 70 + 1) + 70), // Mock match score
            minCheque: inv.capitalRange ? inv.capitalRange.split("-")[0] : "₦0", // Basic parsing assumption
            maxCheque: inv.capitalRange ? inv.capitalRange.split("-")[1] : "₦0",
            description: "Experienced investor actively looking for opportunities." // Placeholder as no description in schema
        }));
    },
});
