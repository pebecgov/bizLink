import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAuthorized } from "./accessControl";



// Get all required services for a specific sector and investor type
export const getSectorRequirements = query({
    args: {
        sector: v.string(),
        investorType: v.union(v.literal("local"), v.literal("foreign")),
    },
    handler: async (ctx, args) => {
        let requirements = await ctx.db
            .query("sector_requirements")
            .withIndex("by_sector_type", (q) =>
                q.eq("sector", args.sector).eq("investorType", args.investorType)
            )
            .first();

        // Fallback to Manufacturing if specific sector not found
        if (!requirements) {
            requirements = await ctx.db
                .query("sector_requirements")
                .withIndex("by_sector_type", (q) =>
                    q.eq("sector", "Manufacturing").eq("investorType", args.investorType)
                )
                .first();
        }

        if (!requirements) return null;


        // Fetch MDA details for each requirement
        const detailedReqs = await Promise.all(
            requirements.requirements.map(async (req) => {
                const mda = await ctx.db
                    .query("mdas")
                    .withIndex("by_acronym", (q) => q.eq("acronym", req.issuingMda))
                    .first();

                const service = mda?.services.find(s => s.name === req.serviceName);

                return {
                    ...req,
                    mdaName: mda?.name,
                    timeline: service?.timeline,
                    cost: service?.cost,
                    mdaDescription: mda?.description,
                };
            })
        );

        return detailedReqs;
    },
});

// Start a new concierge case for an investor
export const startConciergeCase = mutation({
    args: {
        sector: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        // Check if case already exists for this sector
        const existing = await ctx.db
            .query("concierge_cases")
            .withIndex("by_user_sector", (q) =>
                q.eq("userId", identity.subject).eq("sector", args.sector)
            )
            .first();


        if (existing) return existing._id;

        // Get requirements to build initial checklist
        let reqs = await ctx.db
            .query("sector_requirements")
            .withIndex("by_sector_type", (q) =>
                q.eq("sector", args.sector).eq("investorType", "foreign")
            )
            .first();

        // Fallback to Manufacturing if sector not found
        if (!reqs) {
            reqs = await ctx.db
                .query("sector_requirements")
                .withIndex("by_sector_type", (q) =>
                    q.eq("sector", "Manufacturing").eq("investorType", "foreign")
                )
                .first();
        }

        if (!reqs) throw new Error("Roadmap templates not found. Please contact support.");


        const checklist = reqs.requirements.map(r => ({
            requirementKey: r.serviceName,
            isCompleted: false,
        }));

        const caseId = await ctx.db.insert("concierge_cases", {
            userId: identity.subject,
            status: "in_progress",
            currentStep: 0,
            checklists: checklist,
            sector: args.sector,
            lastUpdated: Date.now(),
        });

        return caseId;
    },
});

// Get active case for current user and sector
export const getMyConciergeCase = query({
    args: {
        sector: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        return await ctx.db
            .query("concierge_cases")
            .withIndex("by_user_sector", (q) =>
                q.eq("userId", identity.subject).eq("sector", args.sector)
            )
            .first();
    },
});


// Update a step in the concierge case
export const updateCaseStep = mutation({
    args: {
        caseId: v.id("concierge_cases"),
        serviceName: v.string(),
        isCompleted: v.boolean(),
        documentUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const conciergeCase = await ctx.db.get(args.caseId);
        if (!conciergeCase || !('checklists' in conciergeCase)) throw new Error("Case not found or invalid");

        const newChecklist = (conciergeCase.checklists as any[]).map(item => {
            if (item.requirementKey === args.serviceName) {
                return {
                    ...item,
                    isCompleted: args.isCompleted,
                    documentUrl: args.documentUrl || item.documentUrl,
                    completedAt: args.isCompleted ? Date.now() : item.completedAt,
                };
            }
            return item;
        });


        await ctx.db.patch(args.caseId, {
            checklists: newChecklist,
            lastUpdated: Date.now(),
        });

        return { success: true };
    },
});

// List all MDAs or filter by sector
export const listMdas = query({
    args: {
        sector: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        let mdas;
        if (args.sector) {
            mdas = await ctx.db
                .query("mdas")
                .collect();
            // Filter in memory for simplicity
            return mdas.filter(m => m.sectors.includes("All") || m.sectors.includes(args.sector!));
        } else {
            mdas = await ctx.db.query("mdas").collect();
        }
        return mdas;
    },
});

// Regulator Mutations

// Update a specific service within an MDA
export const updateMdaService = mutation({
    args: {
        mdaId: v.id("mdas"),
        serviceName: v.string(),
        updates: v.object({
            timeline: v.optional(v.string()),
            requirements: v.optional(v.string()),
            cost: v.optional(v.string()),
            description: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        await assertAuthorized(ctx, ["regulator", "admin", "system_admin"]);

        const mda = await ctx.db.get(args.mdaId);
        if (!mda || !('services' in mda)) throw new Error("MDA not found or invalid");

        const newServices = (mda.services as any[]).map((s: any) => {
            if (s.name === args.serviceName) {
                return { ...s, ...args.updates };
            }
            return s;
        });


        await ctx.db.patch(args.mdaId, { services: newServices });
        return { success: true };
    },
});

// Update the entire roadmap for a sector
export const updateSectorRequirements = mutation({
    args: {
        sector: v.string(),
        investorType: v.union(v.literal("local"), v.literal("foreign")),
        requirements: v.array(v.object({
            serviceName: v.string(),
            issuingMda: v.string(),
            description: v.string(),
            isRequired: v.boolean(),
            order: v.number(),
        })),
    },
    handler: async (ctx, args) => {
        await assertAuthorized(ctx, ["regulator", "admin", "system_admin"]);

        const existing = await ctx.db
            .query("sector_requirements")
            .withIndex("by_sector_type", (q) =>
                q.eq("sector", args.sector).eq("investorType", args.investorType)
            )
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, { requirements: args.requirements });
        } else {
            await ctx.db.insert("sector_requirements", {
                sector: args.sector,
                investorType: args.investorType,
                requirements: args.requirements,
            });
        }
        return { success: true };
    },
});

// Create a new MDA
export const createMda = mutation({
    args: {
        name: v.string(),
        acronym: v.string(),
        description: v.optional(v.string()),
        sectors: v.array(v.string()),
        services: v.array(v.object({
            name: v.string(),
            timeline: v.string(),
            requirements: v.string(),
            cost: v.string(),
            description: v.optional(v.string()),
        })),
    },
    handler: async (ctx, args) => {
        await assertAuthorized(ctx, ["regulator", "admin", "system_admin"]);

        const existing = await ctx.db
            .query("mdas")
            .withIndex("by_acronym", (q) => q.eq("acronym", args.acronym))
            .first();

        if (existing) throw new Error("MDA with this acronym already exists");

        return await ctx.db.insert("mdas", {
            name: args.name,
            acronym: args.acronym,
            description: args.description,
            sectors: args.sectors,
            services: args.services,
        });

    },
});
