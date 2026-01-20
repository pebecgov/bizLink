import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBusinessProfile = mutation({
    args: {
        businessName: v.string(),
        registrationNumber: v.string(),
        contactName: v.string(),
        contactPhone: v.string(),
        state: v.string(),
        lga: v.string(),
        sector: v.string(),
        subsector: v.string(),
        // We'll handle documents separately or as a list of URLs after upload
        documents: v.array(v.object({
            type: v.string(),
            url: v.string(),
            status: v.string()
        })),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called createBusinessProfile without authentication present");
        }

        // 1. Create Business
        const businessId = await ctx.db.insert("businesses", {
            ownerId: identity.subject, // Using Clerk ID (subject) as ownerId
            businessName: args.businessName,
            registrationNumber: args.registrationNumber,
            contactName: args.contactName,
            contactPhone: args.contactPhone,
            state: args.state,
            lga: args.lga,
            sector: args.sector,
            subsector: args.subsector,
            documents: args.documents,
            verificationStatus: "pending",
            riskScore: undefined, // Initial score
        });

        // 2. Update User Role
        // specific user lookup by clerkId might be needed if we don't have the internal ID
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (user) {
            await ctx.db.patch(user._id, { role: "business_owner" }); // OR "user" + business association? Schema said role is union.
        }

        return businessId;
    },
});

export const createInvestorProfile = mutation({
    args: {
        // Legal entity information
        registeredName: v.string(),
        jurisdiction: v.string(),
        incorporationDocs: v.optional(v.array(v.object({
            name: v.string(),
            size: v.string()
        }))),
        taxIdType: v.string(),
        taxIdentificationNumber: v.string(),
        taxIssuingCountry: v.string(),
        // Investment preferences
        sectors: v.array(v.string()),
        capitalRange: v.string(),
        riskAppetite: v.string(),
        regions: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called createInvestorProfile without authentication present");
        }

        // 1. Create Investor Profile
        const profileId = await ctx.db.insert("investor_profiles", {
            userId: identity.subject,
            // Legal details
            registeredName: args.registeredName,
            jurisdiction: args.jurisdiction,
            incorporationDocs: args.incorporationDocs || undefined,
            taxIdType: args.taxIdType,
            taxIdentificationNumber: args.taxIdentificationNumber,
            taxIssuingCountry: args.taxIssuingCountry,
            // Investment preferences
            sectors: args.sectors,
            regions: args.regions || undefined,
            capitalRange: args.capitalRange,
            riskAppetite: args.riskAppetite,
        });

        // 2. Update User Role
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (user) {
            await ctx.db.patch(user._id, { role: "investor" });
        }

        return profileId;
    },
});

// Get current investor profile
export const getInvestorProfile = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        return await ctx.db
            .query("investor_profiles")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .first();
    },
});

// Update investor profile (sectors, regions, etc.)
export const updateInvestorProfile = mutation({
    args: {
        sectors: v.optional(v.array(v.string())),
        regions: v.optional(v.array(v.string())),
        capitalRange: v.optional(v.string()),
        riskAppetite: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const profile = await ctx.db
            .query("investor_profiles")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .first();

        if (!profile) {
            throw new Error("Investor profile not found");
        }

        // Build update object with only provided fields
        const updates: any = {};
        if (args.sectors !== undefined) updates.sectors = args.sectors;
        if (args.regions !== undefined) updates.regions = args.regions;
        if (args.capitalRange !== undefined) updates.capitalRange = args.capitalRange;
        if (args.riskAppetite !== undefined) updates.riskAppetite = args.riskAppetite;

        await ctx.db.patch(profile._id, updates);

        return { success: true, profileId: profile._id };
    },
});

