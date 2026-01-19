"use client";

import { Sparkles, Filter, MapPin, X, ExternalLink, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

export default function MatchedBusinessesPage() {
    const matchedResults = useQuery(api.matching.getMatchedBusinesses);
    const dismissMatch = useMutation(api.matching.dismissMatch);
    const getAIExplanation = useAction(api.matching.getMatchWithAIExplanation);

    const [aiReasons, setAiReasons] = useState<Record<string, string>>({});
    const [loadingAI, setLoadingAI] = useState<Record<string, boolean>>({});

    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [minScore, setMinScore] = useState(0);
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    // Get AI explanations for top matches
    useEffect(() => {
        if (matchedResults && matchedResults.length > 0) {
            matchedResults.slice(0, 3).forEach(async (match) => {
                const businessId = match.business._id;
                if (!aiReasons[businessId] && !loadingAI[businessId]) {
                    setLoadingAI(prev => ({ ...prev, [businessId]: true }));
                    try {
                        const result = await getAIExplanation({
                            businessId: match.business._id,
                            investorSectors: [],
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

    // Get unique sectors and locations from results
    const uniqueSectors = [...new Set(matchedResults?.map(m => m.business.sector).filter(Boolean) || [])];
    const uniqueLocations = [...new Set(matchedResults?.map(m => m.business.state).filter(Boolean) || [])];

    // Apply filters
    const filteredResults = matchedResults?.filter(match => {
        if (minScore > 0 && match.score < minScore) return false;
        if (selectedSectors.length > 0 && !selectedSectors.includes(match.business.sector || "")) return false;
        if (selectedLocation && match.business.state !== selectedLocation) return false;
        return true;
    }) || [];

    const clearFilters = () => {
        setMinScore(0);
        setSelectedSectors([]);
        setSelectedLocation("");
    };

    const hasActiveFilters = minScore > 0 || selectedSectors.length > 0 || selectedLocation !== "";

    if (matchedResults === undefined) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">AI-Matched Businesses</h1>
                        <p className="text-gray-500">Curated opportunities matching your investment criteria</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    const handleDismiss = async (businessId: Id<"businesses">) => {
        await dismissMatch({ businessId });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI-Matched Businesses</h1>
                    <p className="text-gray-500">
                        Curated opportunities matching your investment criteria
                        {matchedResults.length > 0 && ` (${filteredResults.length} of ${matchedResults.length})`}
                    </p>
                </div>
                <Button
                    variant="outline"
                    className={`gap-2 ${hasActiveFilters ? 'border-green-500 text-green-600' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter Matches
                    {hasActiveFilters && <span className="bg-green-500 text-white text-xs px-1.5 rounded-full">!</span>}
                </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Filter Results</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Minimum Score */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Score: {minScore}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={minScore}
                                onChange={(e) => setMinScore(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                        </div>

                        {/* Sector Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sector
                            </label>
                            <select
                                value={selectedSectors[0] || ""}
                                onChange={(e) => setSelectedSectors(e.target.value ? [e.target.value] : [])}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="">All Sectors</option>
                                {uniqueSectors.map(sector => (
                                    <option key={sector} value={sector}>{sector}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="">All Locations</option>
                                {uniqueLocations.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {filteredResults.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {matchedResults.length === 0 ? "No Matches Found" : "No Results Match Filters"}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {matchedResults.length === 0
                            ? "We couldn't find any businesses matching your sector preferences. Try broadening your investment preferences."
                            : "Try adjusting your filters to see more results."}
                    </p>
                    {matchedResults.length === 0 ? (
                        <Link href="/dashboard/settings/preferences">
                            <Button className="bg-green-600 hover:bg-green-700">
                                Update Investment Preferences
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={clearFilters} variant="outline">
                            Clear All Filters
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults.map((match) => (
                        <div
                            key={match.business._id}
                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300 group flex flex-col relative"
                        >
                            {/* Dismiss button */}
                            <button
                                onClick={() => handleDismiss(match.business._id)}
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex items-start justify-between mb-3">
                                <div className="pr-6">
                                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                                        {match.business.businessName}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {match.business.headOfficeAddress?.city || match.business.state || "Nigeria"}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shrink-0">
                                    {match.score}%
                                </div>
                            </div>

                            {/* AI Reason */}
                            {aiReasons[match.business._id] && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                                    <p className="text-xs text-yellow-800 flex items-start gap-1">
                                        <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                                        <span className="line-clamp-2">{aiReasons[match.business._id]}</span>
                                    </p>
                                </div>
                            )}

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px] flex-grow">
                                {match.business.companyDescription || "No description provided."}
                            </p>

                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {match.business.sector || "General"}
                                </span>
                                {match.business.fundingAmount && (
                                    <span className="text-sm font-semibold text-gray-700">
                                        {match.business.fundingAmount}
                                    </span>
                                )}
                            </div>

                            {/* Score breakdown on hover */}
                            <div className="hidden group-hover:block mb-4 bg-gray-50 rounded-lg p-2">
                                <div className="text-xs text-gray-500 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Sector Match</span>
                                        <span className="font-medium text-green-600">{match.factors.sector}/35</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Location</span>
                                        <span className="font-medium">{match.factors.location}/25</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Capital Fit</span>
                                        <span className="font-medium">{match.factors.capital}/20</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <Link
                                    href={`/businesses/${match.business._id}`}
                                    className="flex-1"
                                >
                                    <Button className="w-full bg-green-600 hover:bg-green-700 gap-1">
                                        View Details
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                                    onClick={() => {
                                        // TODO: Implement connect functionality
                                        alert(`Contact feature coming soon for ${match.business.businessName}`);
                                    }}
                                >
                                    Connect
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info about matching */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 text-green-800">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">How matching works:</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                    Businesses are matched based on your sector preferences, target regions, capital range, and risk appetite.
                    Only businesses that match your selected sectors are shown.
                </p>
            </div>
        </div>
    );
}
