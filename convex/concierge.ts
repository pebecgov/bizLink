import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * List all government agencies (MDAs)
 */
export const listMdas = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("mdas").collect();
    },
});

/**
 * Get requirements for a specific sector and entity type (local/foreign)
 */
export const getSectorRequirements = query({
    args: {
        sector: v.string(),
        entityType: v.union(v.literal("local"), v.literal("foreign")),
    },
    handler: async (ctx, args) => {
        const record = await ctx.db
            .query("sector_requirements")
            .withIndex("by_sector_type", (q) =>
                q.eq("sector", args.sector).eq("entityType", args.entityType)
            )
            .first();
        return record?.requirements || [];
    },
});

/**
 * Update the roadmap requirements for a sector
 */
export const updateSectorRequirements = mutation({
    args: {
        sector: v.string(),
        entityType: v.union(v.literal("local"), v.literal("foreign")),
        requirements: v.array(v.object({
            serviceName: v.string(),
            issuingMda: v.string(),
            description: v.string(),
            isRequired: v.boolean(),
            order: v.number(),
        })),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("sector_requirements")
            .withIndex("by_sector_type", (q) =>
                q.eq("sector", args.sector).eq("entityType", args.entityType)
            )
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, { requirements: args.requirements });
        } else {
            await ctx.db.insert("sector_requirements", {
                sector: args.sector,
                entityType: args.entityType,
                requirements: args.requirements,
            });
        }
    },
});

/**
 * Update a specific service within an MDA
 */
export const updateMdaService = mutation({
    args: {
        mdaId: v.id("mdas"),
        serviceName: v.string(),
        updates: v.object({
            timeline: v.optional(v.string()),
            cost: v.optional(v.string()),
            requirements: v.optional(v.string()),
            description: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        const mda = await ctx.db.get(args.mdaId);
        if (!mda) throw new Error("MDA not found");

        const services = mda.services.map(s => {
            if (s.name === args.serviceName) {
                return { ...s, ...args.updates };
            }
            return s;
        });

        await ctx.db.patch(args.mdaId, { services });
    },
});
