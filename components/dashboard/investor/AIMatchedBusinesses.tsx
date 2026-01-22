"use client";

import { ArrowRight, ExternalLink, Sparkles, X, Loader2 } from "lucide-react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

interface MatchedBusiness {
    business: {
        _id: Id<"businesses">;
        businessName?: string;
        sector?: string;
        state?: string;
        companyDescription?: string;
        fundingAmount?: string;
        headOfficeAddress?: { city?: string };
    };
    score: number;
    factors: {
        sector: number;
        location: number;
        capital: number;
        risk: number;
        stage: number;
    };
    aiReason?: string;
}

export function AIMatchedBusinesses() {
    const matchedResults = useQuery(api.matching.getMatchedBusinesses);
    const dismissMatch = useMutation(api.matching.dismissMatch);
    const getAIExplanation = useAction(api.matching.getMatchWithAIExplanation);
    const initiateConnect = useMutation(api.connections.initiateConnection);


    const [aiReasons, setAiReasons] = useState<Record<string, string>>({});
    const [loadingAI, setLoadingAI] = useState<Record<string, boolean>>({});
    const [connecting, setConnecting] = useState<Record<string, boolean>>({});

    // Fetch existing connections to disable connect button for already connected businesses
    const myConnections = useQuery(api.connections.getMyConnections);
    const connectionMap = myConnections?.reduce((acc, conn) => {
        if (conn.businessId) acc[conn.businessId] = conn.status;
        return acc;
    }, {} as Record<string, string>) || {};

    // Get AI explanations for top matches
    useEffect(() => {
        if (matchedResults && matchedResults.length > 0) {
            matchedResults.slice(0, 3).forEach(async (match: MatchedBusiness) => {
                const businessId = match.business._id;
                if (!aiReasons[businessId] && !loadingAI[businessId]) {
                    setLoadingAI(prev => ({ ...prev, [businessId]: true }));
                    try {
                        const result = await getAIExplanation({
                            businessId: match.business._id,
                            investorSectors: [], // Will be fetched in the action
                            investorRegions: [],
                            capitalRange: "10k-50k",
                            riskAppetite: "medium",
                            businessName: match.business.businessName || "Business",
                            businessSector: match.business.sector || "General",
                            businessDescription: match.business.companyDescription,
                            businessLocation: match.business.state || "Nigeria",
                            score: match.score,
                        });
                        setAiReasons(prev => ({ ...prev, [businessId]: result.aiReason }));
                    } catch (error) {
                        console.error("AI explanation error:", error);
                    } finally {
                        setLoadingAI(prev => ({ ...prev, [businessId]: false }));
                    }
                }
            });
        }
    }, [matchedResults]);

    if (matchedResults === undefined) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="mb-6">
                    <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    const matches = matchedResults.slice(0, 3).map((match: MatchedBusiness) => ({
        id: match.business._id,
        name: match.business.businessName || "Unnamed Business",
        matchScore: match.score,
        sector: match.business.sector || "Unspecified Sector",
        seeking: match.business.fundingAmount || "N/A",
        location: match.business.headOfficeAddress?.city || match.business.state || "Nigeria",
        description: match.business.companyDescription || "No description provided.",
        factors: match.factors,
        aiReason: aiReasons[match.business._id],
    }));

    if (matches.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    AI-Matched Business Opportunities
                </h2>
                <p className="text-gray-500 py-8">
                    No matching businesses found. Update your investment preferences to see matches.
                </p>
            </div>
        );
    }

    const handleDismiss = async (businessId: Id<"businesses">) => {
        await dismissMatch({ businessId });
    };


    const handleConnect = async (businessId: Id<"businesses">, businessName: string) => {
        setConnecting(prev => ({ ...prev, [businessId]: true }));
        try {
            await initiateConnect({ businessId });
            toast.success(`Connection request sent to ${businessName}`);
        } catch (error) {
            console.error("Connection error:", error);
            toast.error("Failed to initiate connection. Please try again.");
        } finally {
            setConnecting(prev => ({ ...prev, [businessId]: false }));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-xl font-bold text-gray-900">
                        AI-Matched Business Opportunities
                    </h2>
                </div>
                <p className="text-sm text-gray-600">
                    Smart matches based on your investment preferences
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {matches.map((business) => (
                    <div
                        key={business.id}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300 group flex flex-col justify-between relative"
                    >
                        {/* Dismiss button */}
                        <button
                            onClick={() => handleDismiss(business.id)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div>
                            <div className="flex items-start justify-between mb-3">
                                <div className="pr-6">
                                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                                        {business.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">{business.location}</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shrink-0">
                                    {business.matchScore}%
                                </div>
                            </div>

                            {/* AI Reason */}
                            {business.aiReason && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                                    <p className="text-xs text-yellow-800 flex items-start gap-1">
                                        <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                                        <span className="line-clamp-2">{business.aiReason}</span>
                                    </p>
                                </div>
                            )}

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                                {business.description}
                            </p>

                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {business.sector}
                                </span>
                                {business.seeking !== "N/A" && (
                                    <span className="text-sm font-semibold text-gray-700">
                                        {business.seeking}
                                    </span>
                                )}
                            </div>

                            {/* Score breakdown on hover */}
                            <div className="hidden group-hover:block mb-4">
                                <div className="text-xs text-gray-500 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Sector</span>
                                        <span className="font-medium">{business.factors.sector}/35</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Location</span>
                                        <span className="font-medium">{business.factors.location}/25</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Capital</span>
                                        <span className="font-medium">{business.factors.capital}/20</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-auto">
                            <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                                View
                                <ExternalLink className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => handleConnect(business.id as Id<"businesses">, business.name)}
                                disabled={connecting[business.id] || !!connectionMap[business.id]}
                                className="flex-1 px-3 py-2 border border-green-600 text-green-600 text-sm font-medium rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                            >
                                {connecting[business.id] ? (
                                    <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Connecting
                                    </>
                                ) : connectionMap[business.id] ? (
                                    connectionMap[business.id].charAt(0).toUpperCase() + connectionMap[business.id].slice(1)
                                ) : (
                                    "Connect"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-medium rounded-lg hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                View All Matches ({matchedResults?.length || 0})
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
