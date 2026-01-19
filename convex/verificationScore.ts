import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { CORE_DOCUMENTS, getRequiredDocumentsForSubsector, ADDITIONAL_DOCUMENTS } from "../constants/documentTypes";

// ==================== QUERIES ====================

/**
 * Get all verification documents for a business
 */
export const getVerificationDocuments = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const documents = await ctx.db
            .query("verification_documents")
            .withIndex("by_businessId", (q) => q.eq("businessId", args.businessId))
            .collect();

        // Resolve file URLs
        const documentsWithUrls = await Promise.all(
            documents.map(async (doc) => {
                const url = await ctx.storage.getUrl(doc.fileUrl);
                return { ...doc, resolvedUrl: url };
            })
        );

        return documentsWithUrls;
    },
});

/**
 * Calculate verification score for a business
 */
export const calculateVerificationScore = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const business = await ctx.db.get(args.businessId);
        if (!business) {
            return {
                totalPercentage: 0,
                coreScore: 0,
                sectorScore: 0,
                additionalScore: 0,
                tier: "Basic Listing",
                canReceiveInvestment: false,
                missingCoreDocuments: [],
                missingSectorDocuments: [],
            };
        }

        // Get verified documents
        const documents = await ctx.db
            .query("verification_documents")
            .withIndex("by_businessId", (q) => q.eq("businessId", args.businessId))
            .filter((q) => q.eq(q.field("status"), "verified"))
            .collect();

        const verifiedDocTypes = new Set(documents.map((d) => d.documentType));

        // Check if subsector has required documents
        const subsector = business.subsector || "";
        const sectorDocs = getRequiredDocumentsForSubsector(subsector);
        const hasSectorDocs = sectorDocs.length > 0;

        // Dynamic weight allocation:
        // - If subsector has required docs: Core 60%, Sector 30%, Additional 10%
        // - If subsector has NO required docs: Core 90%, Additional 10% (sector weight absorbed by core)
        const coreWeight = hasSectorDocs ? 60 : 90;
        const sectorWeight = hasSectorDocs ? 30 : 0;
        const additionalWeight = 10;

        // Calculate core documents score
        const coreDocsWeight = CORE_DOCUMENTS.reduce((sum, doc) => sum + doc.weight, 0);
        let coreScore = 0;
        const missingCoreDocuments: string[] = [];

        CORE_DOCUMENTS.forEach((doc) => {
            if (verifiedDocTypes.has(doc.id)) {
                coreScore += (doc.weight / coreDocsWeight) * coreWeight;
            } else {
                missingCoreDocuments.push(doc.name);
            }
        });

        // Calculate sector-specific documents score
        const sectorDocsWeight = sectorDocs.reduce((sum, doc) => sum + doc.weight, 0) || 1;
        let sectorScore = 0;
        const missingSectorDocuments: string[] = [];

        if (hasSectorDocs) {
            sectorDocs.forEach((doc) => {
                if (verifiedDocTypes.has(doc.id)) {
                    sectorScore += (doc.weight / sectorDocsWeight) * sectorWeight;
                } else {
                    missingSectorDocuments.push(doc.name);
                }
            });
        }

        // Calculate additional documents score
        const additionalDocsWeight = ADDITIONAL_DOCUMENTS.reduce((sum, doc) => sum + doc.weight, 0);
        let additionalScore = 0;

        ADDITIONAL_DOCUMENTS.forEach((doc) => {
            if (verifiedDocTypes.has(doc.id)) {
                additionalScore += (doc.weight / additionalDocsWeight) * additionalWeight;
            }
        });

        const totalPercentage = Math.round(coreScore + sectorScore + additionalScore);
        const tier = getTier(totalPercentage);
        const canReceiveInvestment = totalPercentage >= 75;

        return {
            totalPercentage,
            coreScore: Math.round(coreScore),
            sectorScore: Math.round(sectorScore),
            additionalScore: Math.round(additionalScore),
            tier,
            canReceiveInvestment,
            missingCoreDocuments,
            missingSectorDocuments,
            verifiedDocumentsCount: documents.length,
        };
    },
});

/**
 * Get verification tier badge information
 */
export const getVerificationTier = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const business = await ctx.db.get(args.businessId);
        if (!business) return null;

        const percentage = business.verificationPercentage || 0;
        const tier = getTier(percentage);

        return {
            tier,
            percentage,
            nextTier: getNextTier(percentage),
            percentageToNextTier: getPercentageToNextTier(percentage),
            benefits: getTierBenefits(tier),
        };
    },
});

// ==================== MUTATIONS ====================

/**
 * Upload a verification document
 */
export const uploadVerificationDocument = mutation({
    args: {
        businessId: v.id("businesses"),
        documentType: v.string(),
        category: v.union(v.literal("core"), v.literal("sector_specific"), v.literal("additional")),
        fileUrl: v.string(), // Storage ID from generateUploadUrl
        fileName: v.string(),
        fileSize: v.number(),
        metadata: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(args.businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        // Check if document already exists
        const existing = await ctx.db
            .query("verification_documents")
            .withIndex("by_business_type", (q) =>
                q.eq("businessId", args.businessId).eq("documentType", args.documentType)
            )
            .first();

        if (existing) {
            // Update existing document
            await ctx.db.patch(existing._id, {
                fileUrl: args.fileUrl,
                fileName: args.fileName,
                fileSize: args.fileSize,
                status: "pending",
                uploadedAt: Date.now(),
                metadata: args.metadata,
                verifiedAt: undefined,
                verifiedBy: undefined,
                rejectionReason: undefined,
            });
            return existing._id;
        }

        // Create new document
        const docId = await ctx.db.insert("verification_documents", {
            businessId: args.businessId,
            documentType: args.documentType,
            category: args.category,
            fileUrl: args.fileUrl,
            fileName: args.fileName,
            fileSize: args.fileSize,
            status: "pending",
            uploadedAt: Date.now(),
            metadata: args.metadata,
        });

        return docId;
    },
});

/**
 * Delete a verification document
 */
export const deleteVerificationDocument = mutation({
    args: {
        documentId: v.id("verification_documents"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const document = await ctx.db.get(args.documentId);
        if (!document) throw new Error("Document not found");

        const business = await ctx.db.get(document.businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        await ctx.db.delete(args.documentId);
        return true;
    },
});

/**
 * Update funding preferences
 */
export const updateFundingPreferences = mutation({
    args: {
        businessId: v.id("businesses"),
        seekingFunding: v.boolean(),
        fundingAmount: v.optional(v.string()),
        equityOffered: v.optional(v.string()),
        useOfFunds: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const business = await ctx.db.get(args.businessId);
        if (!business || business.ownerId !== identity.subject) {
            throw new Error("Not authorized");
        }

        const { businessId, ...updateData } = args;

        await ctx.db.patch(businessId, {
            ...updateData,
            lastUpdated: Date.now(),
        });

        return businessId;
    },
});

/**
 * Update cached verification percentage
 * (Should be called after document verification status changes)
 */
export const updateVerificationPercentage = mutation({
    args: {
        businessId: v.id("businesses"),
    },
    handler: async (ctx, args) => {
        const business = await ctx.db.get(args.businessId);
        if (!business) throw new Error("Business not found");

        // Get verified documents
        const documents = await ctx.db
            .query("verification_documents")
            .withIndex("by_businessId", (q) => q.eq("businessId", args.businessId))
            .filter((q) => q.eq(q.field("status"), "verified"))
            .collect();

        const verifiedDocTypes = new Set(documents.map((d) => d.documentType));

        // Check if subsector has required documents
        const subsector = business.subsector || "";
        const sectorDocs = getRequiredDocumentsForSubsector(subsector);
        const hasSectorDocs = sectorDocs.length > 0;

        // Dynamic weight allocation
        const coreWeight = hasSectorDocs ? 60 : 90;
        const sectorWeight = hasSectorDocs ? 30 : 0;
        const additionalWeight = 10;

        // Calculate core documents score
        const coreDocsWeight = CORE_DOCUMENTS.reduce((sum, doc) => sum + doc.weight, 0);
        let coreScore = 0;

        CORE_DOCUMENTS.forEach((doc) => {
            if (verifiedDocTypes.has(doc.id)) {
                coreScore += (doc.weight / coreDocsWeight) * coreWeight;
            }
        });

        // Calculate sector-specific documents score
        const sectorDocsWeight = sectorDocs.reduce((sum, doc) => sum + doc.weight, 0) || 1;
        let sectorScore = 0;

        if (hasSectorDocs) {
            sectorDocs.forEach((doc) => {
                if (verifiedDocTypes.has(doc.id)) {
                    sectorScore += (doc.weight / sectorDocsWeight) * sectorWeight;
                }
            });
        }

        // Calculate additional documents score
        const additionalDocsWeight = ADDITIONAL_DOCUMENTS.reduce((sum, doc) => sum + doc.weight, 0);
        let additionalScore = 0;

        ADDITIONAL_DOCUMENTS.forEach((doc) => {
            if (verifiedDocTypes.has(doc.id)) {
                additionalScore += (doc.weight / additionalDocsWeight) * additionalWeight;
            }
        });

        const totalPercentage = Math.round(coreScore + sectorScore + additionalScore);
        const tier = getTier(totalPercentage);

        // Update business record
        await ctx.db.patch(args.businessId, {
            verificationPercentage: totalPercentage,
            verificationLevel: tier,
            lastUpdated: Date.now(),
        });

        return totalPercentage;
    },
});

// ==================== HELPER FUNCTIONS ====================

function getTier(percentage: number): string {
    if (percentage < 50) return "Basic Listing";
    if (percentage < 70) return "Verified for Viewing";
    if (percentage < 85) return "Investment Ready";
    if (percentage < 95) return "Highly Verified";
    return "Premium Verified";
}

function getNextTier(percentage: number): string | null {
    if (percentage < 50) return "Verified for Viewing";
    if (percentage < 70) return "Investment Ready";
    if (percentage < 85) return "Highly Verified";
    if (percentage < 95) return "Premium Verified";
    return null;
}

function getPercentageToNextTier(percentage: number): number {
    if (percentage < 50) return 50 - percentage;
    if (percentage < 70) return 70 - percentage;
    if (percentage < 85) return 85 - percentage;
    if (percentage < 95) return 95 - percentage;
    return 0;
}

function getTierBenefits(tier: string): string[] {
    const benefits: Record<string, string[]> = {
        "Basic Listing": ["Create profile", "Browse investors"],
        "Verified for Viewing": ["Full profile visibility", "Receive messages from investors", "Apply to pitch events"],
        "Investment Ready": ["Send investment requests", "Receive investment offers", "Negotiate deals", "Access premium investor matching"],
        "Highly Verified": ["Priority listings", "Advanced analytics", "Featured in search results"],
        "Premium Verified": ["Featured listings", "Top of search results", "Access to institutional investors", "Premium credibility badge"],
    };

    return benefits[tier] || [];
}
