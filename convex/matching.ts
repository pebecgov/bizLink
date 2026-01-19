import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// ============================================================================
// CONSTANTS & TYPES
// ============================================================================

const SCORE_WEIGHTS = {
    sector: 35,
    location: 25,
    capital: 20,
    risk: 10,
    stage: 10,
};

// Nigerian regions mapping
const STATE_TO_REGION: Record<string, string> = {
    // North-West
    "Kaduna": "North-West", "Kano": "North-West", "Katsina": "North-West",
    "Kebbi": "North-West", "Sokoto": "North-West", "Jigawa": "North-West", "Zamfara": "North-West",
    // North-East
    "Adamawa": "North-East", "Bauchi": "North-East", "Borno": "North-East",
    "Gombe": "North-East", "Taraba": "North-East", "Yobe": "North-East",
    // North-Central
    "Benue": "North-Central", "Kogi": "North-Central", "Kwara": "North-Central",
    "Nasarawa": "North-Central", "Niger": "North-Central", "Plateau": "North-Central", "FCT": "North-Central",
    // South-West
    "Ekiti": "South-West", "Lagos": "South-West", "Ogun": "South-West",
    "Ondo": "South-West", "Osun": "South-West", "Oyo": "South-West",
    // South-East
    "Abia": "South-East", "Anambra": "South-East", "Ebonyi": "South-East",
    "Enugu": "South-East", "Imo": "South-East",
    // South-South
    "Akwa Ibom": "South-South", "Bayelsa": "South-South", "Cross River": "South-South",
    "Delta": "South-South", "Edo": "South-South", "Rivers": "South-South",
};

// Capital range parsing
const CAPITAL_RANGES: Record<string, { min: number; max: number }> = {
    "1k-10k": { min: 1000, max: 10000 },
    "10k-50k": { min: 10000, max: 50000 },
    "50k-200k": { min: 50000, max: 200000 },
    "200k+": { min: 200000, max: Infinity },
};

// ============================================================================
// SCORING FUNCTIONS
// ============================================================================

function calculateSectorScore(investorSectors: string[], businessSector: string, secondarySectors?: string[]): number {
    // Normalize sector names for comparison (case-insensitive)
    const normalizedInvestorSectors = investorSectors.map(s => s.toLowerCase().trim());
    const normalizedBusinessSector = businessSector.toLowerCase().trim();
    const normalizedSecondary = secondarySectors?.map(s => s.toLowerCase().trim()) || [];

    // Full match on primary sector
    if (normalizedInvestorSectors.some(s => normalizedBusinessSector.includes(s) || s.includes(normalizedBusinessSector))) {
        return SCORE_WEIGHTS.sector;
    }

    // Partial match on secondary sectors
    if (normalizedSecondary.some(sec => normalizedInvestorSectors.some(inv => sec.includes(inv) || inv.includes(sec)))) {
        return Math.floor(SCORE_WEIGHTS.sector * 0.6);
    }

    return 0;
}

function calculateLocationScore(investorRegions: string[], businessState: string): number {
    if (!investorRegions || investorRegions.length === 0) {
        return SCORE_WEIGHTS.location; // No preference = match all
    }

    if (investorRegions.includes("All Regions")) {
        return SCORE_WEIGHTS.location;
    }

    const businessRegion = STATE_TO_REGION[businessState];
    if (businessRegion && investorRegions.includes(businessRegion)) {
        return SCORE_WEIGHTS.location;
    }

    return 0;
}

function calculateCapitalScore(investorCapitalRange: string, businessFundingAmount?: string): number {
    if (!businessFundingAmount) {
        return Math.floor(SCORE_WEIGHTS.capital * 0.5); // Unknown = partial score
    }

    const investorRange = CAPITAL_RANGES[investorCapitalRange];
    if (!investorRange) {
        return Math.floor(SCORE_WEIGHTS.capital * 0.5);
    }

    // Parse business funding amount (e.g., "$50,000" or "₦10,000,000")
    const numericValue = parseFloat(businessFundingAmount.replace(/[^0-9.]/g, ""));
    if (isNaN(numericValue)) {
        return Math.floor(SCORE_WEIGHTS.capital * 0.5);
    }

    // Convert to USD if in Naira (rough estimate)
    const valueInUSD = businessFundingAmount.includes("₦") ? numericValue / 1500 : numericValue;

    if (valueInUSD >= investorRange.min && valueInUSD <= investorRange.max) {
        return SCORE_WEIGHTS.capital;
    }

    // Partial score if within 50% of range
    if (valueInUSD >= investorRange.min * 0.5 && valueInUSD <= investorRange.max * 1.5) {
        return Math.floor(SCORE_WEIGHTS.capital * 0.6);
    }

    return 0;
}

function calculateRiskScore(investorRiskAppetite: string, businessStage?: string): number {
    const riskMap: Record<string, string[]> = {
        "low": ["Established", "Growth"],
        "medium": ["Growth", "Startup", "Established"],
        "high": ["Startup", "Growth"],
    };

    if (!businessStage) {
        return Math.floor(SCORE_WEIGHTS.risk * 0.5);
    }

    const acceptableStages = riskMap[investorRiskAppetite] || riskMap["medium"];
    return acceptableStages.includes(businessStage) ? SCORE_WEIGHTS.risk : 0;
}

function calculateStageScore(businessStage?: string, businessVerificationStatus?: string): number {
    if (!businessStage) {
        return Math.floor(SCORE_WEIGHTS.stage * 0.5);
    }

    // Prefer verified businesses
    let score = SCORE_WEIGHTS.stage;
    if (businessVerificationStatus !== "verified") {
        score = Math.floor(score * 0.7);
    }

    return score;
}

// ============================================================================
// MAIN MATCHING QUERY
// ============================================================================

export const getMatchedBusinesses = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        // Get investor profile
        const investorProfile = await ctx.db
            .query("investor_profiles")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .first();

        if (!investorProfile) {
            return [];
        }

        // Get all businesses seeking funding or verified
        const allBusinesses = await ctx.db.query("businesses").collect();

        // Calculate scores for each business
        const scoredMatches = allBusinesses
            .filter(b => b.businessName) // Filter out incomplete profiles
            .map((business) => {
                const factors = {
                    sector: calculateSectorScore(
                        investorProfile.sectors || [],
                        business.sector || "",
                        business.secondarySectors
                    ),
                    location: calculateLocationScore(
                        investorProfile.regions || [],
                        business.state || ""
                    ),
                    capital: calculateCapitalScore(
                        investorProfile.capitalRange || "10k-50k",
                        business.fundingAmount
                    ),
                    risk: calculateRiskScore(
                        investorProfile.riskAppetite || "medium",
                        business.businessStage
                    ),
                    stage: calculateStageScore(
                        business.businessStage,
                        business.verificationStatus
                    ),
                };

                const score = factors.sector + factors.location + factors.capital + factors.risk + factors.stage;

                return {
                    business,
                    score,
                    factors,
                };
            })
            .filter((m) => m.score > 30) // Minimum score threshold
            .sort((a, b) => b.score - a.score)
            .slice(0, 20); // Top 20 matches

        return scoredMatches;
    },
});

// Get matched investors for a business
export const getMatchedInvestors = query({
    args: { businessId: v.optional(v.id("businesses")) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        // Get business profile
        let business;
        if (args.businessId) {
            business = await ctx.db.get(args.businessId);
        } else {
            business = await ctx.db
                .query("businesses")
                .withIndex("by_ownerId", (q) => q.eq("ownerId", identity.subject))
                .first();
        }

        if (!business) {
            return [];
        }

        // Get all investor profiles
        const allInvestors = await ctx.db.query("investor_profiles").collect();

        // Calculate scores for each investor
        const scoredMatches = allInvestors
            .map((investor) => {
                const factors = {
                    sector: calculateSectorScore(
                        investor.sectors || [],
                        business.sector || "",
                        business.secondarySectors
                    ),
                    location: calculateLocationScore(
                        investor.regions || [],
                        business.state || ""
                    ),
                    capital: calculateCapitalScore(
                        investor.capitalRange || "10k-50k",
                        business.fundingAmount
                    ),
                    risk: calculateRiskScore(
                        investor.riskAppetite || "medium",
                        business.businessStage
                    ),
                    stage: calculateStageScore(
                        business.businessStage,
                        business.verificationStatus
                    ),
                };

                const score = factors.sector + factors.location + factors.capital + factors.risk + factors.stage;

                return {
                    investor,
                    score,
                    factors,
                };
            })
            .filter((m) => m.score > 30)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        return scoredMatches;
    },
});

// ============================================================================
// MATCH STATUS MUTATIONS
// ============================================================================

export const saveMatch = mutation({
    args: {
        businessId: v.id("businesses"),
        score: v.number(),
        factors: v.object({
            sector: v.number(),
            location: v.number(),
            capital: v.number(),
            risk: v.number(),
            stage: v.number(),
        }),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        // Check if match already exists
        const existing = await ctx.db
            .query("matches")
            .withIndex("by_investor_business", (q) =>
                q.eq("investorId", identity.subject).eq("businessId", args.businessId)
            )
            .first();

        if (existing) {
            return existing._id;
        }

        return await ctx.db.insert("matches", {
            investorId: identity.subject,
            businessId: args.businessId,
            score: args.score,
            factors: args.factors,
            status: "new",
            createdAt: Date.now(),
        });
    },
});

export const updateMatchStatus = mutation({
    args: {
        matchId: v.id("matches"),
        status: v.union(
            v.literal("new"),
            v.literal("viewed"),
            v.literal("contacted"),
            v.literal("dismissed")
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.matchId, {
            status: args.status,
            updatedAt: Date.now(),
        });
    },
});

export const dismissMatch = mutation({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const existing = await ctx.db
            .query("matches")
            .withIndex("by_investor_business", (q) =>
                q.eq("investorId", identity.subject).eq("businessId", args.businessId)
            )
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                status: "dismissed",
                updatedAt: Date.now(),
            });
        } else {
            // Create dismissed match record
            await ctx.db.insert("matches", {
                investorId: identity.subject,
                businessId: args.businessId,
                score: 0,
                factors: { sector: 0, location: 0, capital: 0, risk: 0, stage: 0 },
                status: "dismissed",
                createdAt: Date.now(),
            });
        }
    },
});

// ============================================================================
// AI ENHANCEMENT ACTION (using Gemini)
// ============================================================================

export const getMatchWithAIExplanation = action({
    args: {
        businessId: v.id("businesses"),
        investorSectors: v.array(v.string()),
        investorRegions: v.array(v.string()),
        capitalRange: v.string(),
        riskAppetite: v.string(),
        businessName: v.string(),
        businessSector: v.string(),
        businessDescription: v.optional(v.string()),
        businessLocation: v.string(),
        score: v.number(),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Return without AI explanation if no API key
            return {
                aiReason: `Strong match based on sector alignment (${args.businessSector}) and location preferences.`,
            };
        }

        try {
            const prompt = `You are an investment matching assistant. Given the following match, provide a brief 1-2 sentence explanation of why this is a good investment opportunity.

Investor Preferences:
- Interested Sectors: ${args.investorSectors.join(", ")}
- Target Regions: ${args.investorRegions.join(", ")}
- Capital Range: ${args.capitalRange}
- Risk Appetite: ${args.riskAppetite}

Business:
- Name: ${args.businessName}
- Sector: ${args.businessSector}
- Location: ${args.businessLocation}
- Description: ${args.businessDescription || "Not provided"}
- Match Score: ${args.score}%

Provide a concise, professional explanation focusing on the key alignment factors. Do not use bullet points.`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            maxOutputTokens: 100,
                            temperature: 0.7,
                        },
                    }),
                }
            );

            if (!response.ok) {
                console.error("Gemini API error:", response.status);
                return {
                    aiReason: `Strong match based on sector alignment (${args.businessSector}) and location preferences.`,
                };
            }

            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

            return {
                aiReason: aiText.trim() || `Strong match based on sector alignment (${args.businessSector}).`,
            };
        } catch (error) {
            console.error("AI explanation error:", error);
            return {
                aiReason: `Strong match based on sector alignment (${args.businessSector}) and location preferences.`,
            };
        }
    },
});
