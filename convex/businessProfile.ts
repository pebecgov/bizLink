import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ==================== QUERIES ====================

/**
 * Get business profile by ID
 */
export const getBusinessProfile = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.businessId);
    },
});

/**
 * Get profile view count for a business
 */
export const getProfileViewsCount = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const views = await ctx.db
            .query("profile_views")
            .withIndex("by_businessId", (q) => q.eq("businessId", args.businessId))
            .collect();
        return views.length;
    },
});

/**
 * Get recent profile views for a business
 */
export const getRecentProfileViews = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("profile_views")
            .withIndex("by_businessId", (q) => q.eq("businessId", args.businessId))
            .order("desc")
            .take(5);
    },
});

/**
 * Get business by ID (for public profile access)
 */
export const getBusinessById = query({
    args: { id: v.id("businesses") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

/**
 * Get current user's business profile
 */
export const getMyBusinessProfile = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const business = await ctx.db
            .query("businesses")
            .withIndex("by_ownerId", (q) => q.eq("ownerId", identity.subject))
            .first();

        if (business && business.logoUrl) {
            const url = await ctx.storage.getUrl(business.logoUrl);
            if (url) {
                // Return the profile with the resolved URL
                return { ...business, logoUrl: url };
            }
        }

        return business;
    },
});

/**
 * Get all business profiles for discovery
 */
export const getAllBusinesses = query({
    handler: async (ctx) => {
        const businesses = await ctx.db
            .query("businesses")
            .take(100);

        // Filter: Business must have complete "Identity" section to be discoverable
        return businesses.filter((b) =>
            b.businessName &&
            b.logoUrl &&
            b.companyTagline &&
            b.companyDescription
        );
    },
});

/**
 * Calculate profile completeness percentage
 */
export const getProfileCompleteness = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const business = await ctx.db.get(args.businessId);
        if (!business) return 0;

        // Required fields (60% weight) - Needed for listing visibility
        const requiredFields = [
            'businessName', 'logoUrl', 'companyTagline', 'companyDescription',
            'sector', 'subsector', 'contactPhone', 'state', 'lga', 'registrationNumber'
        ];

        // Important optional fields (40% weight)
        const optionalFields = [
            'tradingName', 'website', 'primaryEmail',
            'missionStatement', 'visionStatement', 'imageGallery', 'numberOfEmployees',
            'annualRevenue', 'yearEstablished', 'businessStage'
        ];

        let score = 0;
        requiredFields.forEach(field => {
            if (business[field as keyof typeof business]) {
                score += 60 / requiredFields.length;
            }
        });

        optionalFields.forEach(field => {
            const value = business[field as keyof typeof business];
            if (value && (typeof value !== 'object' || (Array.isArray(value) && value.length > 0))) {
                score += 40 / optionalFields.length;
            }
        });

        return Math.round(score);
    },
});

// ==================== MUTATIONS ====================

/**
 * Update company identity section
 */
export const updateCompanyIdentity = mutation({
    args: {
        businessId: v.id("businesses"),
        logoUrl: v.optional(v.string()),
        businessName: v.optional(v.string()),
        tradingName: v.optional(v.string()),
        companyTagline: v.optional(v.string()),
        companyDescription: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        // Verify ownership
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        // Remove undefined values
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update business classification
 */
export const updateBusinessClassification = mutation({
    args: {
        businessId: v.id("businesses"),
        sector: v.optional(v.string()),
        subsector: v.optional(v.string()),
        secondarySectors: v.optional(v.array(v.string())),
        businessStage: v.optional(v.string()),
        businessModel: v.optional(v.string()),
        targetMarket: v.optional(v.string()),
        afcftaCompliant: v.optional(v.boolean()),
        operatingCountries: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update registration and legal information
 */
export const updateRegistrationLegal = mutation({
    args: {
        businessId: v.id("businesses"),
        registrationNumber: v.optional(v.string()),
        tinNumber: v.optional(v.string()),
        cacRegistrationDate: v.optional(v.string()),
        yearEstablished: v.optional(v.number()),
        companyType: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update contact information
 */
export const updateContactInfo = mutation({
    args: {
        businessId: v.id("businesses"),
        primaryEmail: v.optional(v.string()),
        contactPhone: v.optional(v.string()),
        website: v.optional(v.string()),
        headOfficeAddress: v.optional(v.object({
            street: v.string(),
            city: v.string(),
            state: v.string(),
            country: v.string(),
            postalCode: v.optional(v.string()),
            lga: v.optional(v.string()),
        })),
        socialMedia: v.optional(v.object({
            linkedin: v.optional(v.string()),
            twitter: v.optional(v.string()),
            facebook: v.optional(v.string()),
            instagram: v.optional(v.string()),
            tiktok: v.optional(v.string()),
        })),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update financials information
 */
export const updateFinancials = mutation({
    args: {
        businessId: v.id("businesses"),
        numberOfEmployees: v.optional(v.string()),
        annualRevenue: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update mission & vision
 */
export const updateMissionVision = mutation({
    args: {
        businessId: v.id("businesses"),
        missionStatement: v.optional(v.string()),
        visionStatement: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update media gallery
 */
export const updateMediaGallery = mutation({
    args: {
        businessId: v.id("businesses"),
        imageGallery: v.optional(v.array(v.string())),
        videoGallery: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Add a branch location
 */
export const addBranch = mutation({
    args: {
        businessId: v.id("businesses"),
        branch: v.object({
            name: v.string(),
            address: v.string(),
            phone: v.optional(v.string()),
            isPrimary: v.optional(v.boolean()),
        }),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(args.businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const branches = business.branches || [];
        branches.push(args.branch);

        await ctx.db.patch(args.businessId, {
            branches,
            lastUpdated: Date.now(),
        });

        return args.businessId;
    },
});

/**
 * Remove a branch location
 */
export const removeBranch = mutation({
    args: {
        businessId: v.id("businesses"),
        branchIndex: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(args.businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const branches = business.branches || [];
        branches.splice(args.branchIndex, 1);

        await ctx.db.patch(args.businessId, {
            branches,
            lastUpdated: Date.now(),
        });

        return args.businessId;
    },
});


/**
 * Update products and services
 */
export const updateProductsServices = mutation({
    args: {
        businessId: v.id("businesses"),
        productsServices: v.optional(v.array(v.object({
            name: v.string(),
            description: v.optional(v.string()),
            category: v.optional(v.string()),
        }))),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update team management
 */
export const updateTeamManagement = mutation({
    args: {
        businessId: v.id("businesses"),
        teamMembers: v.optional(v.array(v.object({
            name: v.string(),
            position: v.string(),
            bio: v.optional(v.string()),
            linkedIn: v.optional(v.string()),
        }))),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update market and competition information
 */
export const updateMarketCompetition = mutation({
    args: {
        businessId: v.id("businesses"),
        targetCustomers: v.optional(v.string()),
        marketSize: v.optional(v.string()),
        competitors: v.optional(v.array(v.string())),
        competitiveAdvantage: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update certifications and awards
 */
export const updateCertifications = mutation({
    args: {
        businessId: v.id("businesses"),
        certifications: v.optional(v.array(v.object({
            name: v.string(),
            issuer: v.string(),
            date: v.optional(v.string()),
        }))),
        awards: v.optional(v.array(v.object({
            title: v.string(),
            issuer: v.string(),
            year: v.optional(v.number()),
        }))),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update sustainability information
 */
export const updateSustainability = mutation({
    args: {
        businessId: v.id("businesses"),
        sustainabilityInitiatives: v.optional(v.array(v.string())),
        esgCompliance: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { businessId, ...data } = args;

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update all profile sections at once (bulk update)
 */
export const updateFullProfile = mutation({
    args: {
        businessId: v.id("businesses"),
        data: v.any(), // Accept all profile fields
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(args.businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        // Remove undefined values
        const updateData = Object.fromEntries(
            Object.entries(args.data).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(args.businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return args.businessId;
    },
});

/**
 * Record a profile view
 */
export const recordProfileView = mutation({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        // Don't count owner's own views
        const business = await ctx.db.get(args.businessId);
        if (business && identity && business.ownerId === identity.subject) {
            return;
        }

        await ctx.db.insert("profile_views", {
            businessId: args.businessId,
            viewerId: identity?.subject,
            timestamp: Date.now(),
        });
    },
});
/**
 * Generate upload URL for file uploads
 */
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});
