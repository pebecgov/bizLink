import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Stubbed out functions since Verification Score is being removed

export const getVerificationDocuments = query({
    args: { businessId: v.id("businesses") },
    handler: async () => {
        return [];
    },
});

export const calculateVerificationScore = query({
    args: { businessId: v.id("businesses") },
    handler: async () => {
        return {
            totalPercentage: 0,
            coreScore: 0,
            sectorScore: 0,
            additionalScore: 0,
            tier: "",
            missingCoreDocuments: [],
            missingSectorDocuments: [],
            verifiedDocumentsCount: 0,
        };
    },
});

export const getVerificationTier = query({
    args: { businessId: v.id("businesses") },
    handler: async () => {
        return null;
    },
});

export const uploadVerificationDocument = mutation({
    args: {
        businessId: v.id("businesses"),
        documentType: v.string(),
        category: v.union(v.literal("core"), v.literal("sector_specific"), v.literal("additional")),
        fileUrl: v.string(),
        fileName: v.string(),
        fileSize: v.number(),
        metadata: v.optional(v.any()),
    },
    handler: async () => {
        throw new Error("Feature removed");
    },
});

export const deleteVerificationDocument = mutation({
    args: {
        documentId: v.id("businesses"), // Changed to generic ID type as table is gone
    },
    handler: async () => {
        throw new Error("Feature removed");
    },
});

export const updateVerificationPercentage = mutation({
    args: {
        businessId: v.id("businesses"),
    },
    handler: async () => {
        return 0;
    },
});
