import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Query: Get all businesses with pending documents
export const getPendingBusinesses = query({
    args: {},
    handler: async (ctx) => {
        // Get all businesses
        const businesses = await ctx.db.query("businesses").collect();

        // For each business, count pending documents
        const businessesWithPending = await Promise.all(
            businesses.map(async (business) => {
                const allDocs = await ctx.db
                    .query("verification_documents")
                    .withIndex("by_businessId", (q) => q.eq("businessId", business._id))
                    .collect();

                const pendingDocs = allDocs.filter((doc) => doc.status === "pending");
                const verifiedDocs = allDocs.filter((doc) => doc.status === "verified");

                // Calculate progress
                const totalDocs = allDocs.length;
                const approvedCount = verifiedDocs.length;
                const progressPercentage = totalDocs > 0 ? Math.round((approvedCount / totalDocs) * 100) : 0;

                return {
                    _id: business._id,
                    businessName: business.businessName,
                    sector: business.sector,
                    subsector: business.subsector,
                    totalDocuments: totalDocs,
                    pendingCount: pendingDocs.length,
                    approvedCount: approvedCount,
                    progressPercentage,
                    lastUpdated: business.lastUpdated ?? business._creationTime,
                };
            })
        );

        // Filter only businesses with pending documents and sort by last updated
        return businessesWithPending
            .filter((b) => b.pendingCount > 0)
            .sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
    },
});

// Query: Get all businesses with approved documents
export const getApprovedBusinesses = query({
    args: {},
    handler: async (ctx) => {
        const businesses = await ctx.db.query("businesses").collect();

        const businessesWithApproved = await Promise.all(
            businesses.map(async (business) => {
                const allDocs = await ctx.db
                    .query("verification_documents")
                    .withIndex("by_businessId", (q) => q.eq("businessId", business._id))
                    .collect();

                const verifiedDocs = allDocs.filter((doc) => doc.status === "verified");

                const totalDocs = allDocs.length;
                const approvedCount = verifiedDocs.length;
                const progressPercentage = totalDocs > 0 ? Math.round((approvedCount / totalDocs) * 100) : 0;

                return {
                    _id: business._id,
                    businessName: business.businessName,
                    sector: business.sector,
                    subsector: business.subsector,
                    totalDocuments: totalDocs,
                    approvedCount: approvedCount,
                    progressPercentage,
                    verificationPercentage: business.verificationPercentage || 0,
                    lastUpdated: business.lastUpdated ?? business._creationTime,
                };
            })
        );

        // Filter businesses with at least one approved document
        return businessesWithApproved
            .filter((b) => b.approvedCount > 0)
            .sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
    },
});

// Query: Get all documents for a specific business
export const getBusinessDocuments = query({
    args: {
        businessId: v.id("businesses"),
        status: v.optional(v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected"), v.literal("expired"))),
    },
    handler: async (ctx, args) => {
        let query = ctx.db
            .query("verification_documents")
            .withIndex("by_businessId", (q) => q.eq("businessId", args.businessId));

        const documents = await query.collect();

        // Filter by status if provided
        const filteredDocs = args.status
            ? documents.filter((doc) => doc.status === args.status)
            : documents;

        // Resolve file URLs
        const docsWithUrls = await Promise.all(
            filteredDocs.map(async (doc) => {
                let resolvedUrl = null;
                if (doc.fileUrl) {
                    try {
                        resolvedUrl = await ctx.storage.getUrl(doc.fileUrl as Id<"_storage">);
                    } catch (error) {
                        console.error("Error resolving file URL:", error);
                    }
                }

                return {
                    ...doc,
                    resolvedUrl,
                };
            })
        );

        return docsWithUrls.sort((a, b) => b.uploadedAt - a.uploadedAt);
    },
});

// Mutation: Approve a document
export const approveDocument = mutation({
    args: {
        documentId: v.id("verification_documents"),
        verifiedBy: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const document = await ctx.db.get(args.documentId);
        if (!document) {
            throw new Error("Document not found");
        }

        // Update document status to verified
        await ctx.db.patch(args.documentId, {
            status: "verified",
            verifiedAt: Date.now(),
            verifiedBy: args.verifiedBy,
        });

        // Trigger verification score recalculation
        const business = await ctx.db.get(document.businessId);
        if (business) {
            // Recalculate verification score
            // This will be handled by the existing calculateVerificationScore logic
            // We'll update the business lastUpdated to trigger recalculation
            await ctx.db.patch(document.businessId, {
                lastUpdated: Date.now(),
            });
        }

        return { success: true, documentId: args.documentId };
    },
});

// Mutation: Reject a document
export const rejectDocument = mutation({
    args: {
        documentId: v.id("verification_documents"),
        rejectionReason: v.string(),
        rejectedBy: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const document = await ctx.db.get(args.documentId);
        if (!document) {
            throw new Error("Document not found");
        }

        // Update document status to rejected
        await ctx.db.patch(args.documentId, {
            status: "rejected",
            rejectionReason: args.rejectionReason,
            rejectedBy: args.rejectedBy,
            rejectedAt: Date.now(),
        });

        // Update business lastUpdated
        await ctx.db.patch(document.businessId, {
            lastUpdated: Date.now(),
        });

        return { success: true, documentId: args.documentId };
    },
});
