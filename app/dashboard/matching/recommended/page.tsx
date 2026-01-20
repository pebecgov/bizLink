"use client";

import { Search, Filter, Briefcase, MapPin, Award, ArrowRight, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function RecommendedInvestorsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const investors = useQuery(api.matching.getRecommendedInvestors, {
        searchQuery: searchQuery,
        type: selectedType || undefined
    });

    // Extract unique types for the filter (from fetched data or defaults)
    const INVESTOR_TYPES = investors
        ? Array.from(new Set(investors.map(i => i.type)))
        : ["Venture Capital", "Angel Investor", "Private Equity", "Impact Investor", "Syndicate", "Corporate VC"];

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedType(null);
    };

    const hasActiveFilters = searchQuery || selectedType;

    // Helper to format currency to Naira
    const formatCurrency = (value: string) => {
        if (!value) return "₦0";
        // If it already has a currency symbol, replace $ with ₦
        if (value.includes("$")) return value.replace("$", "₦");
        if (value.includes("₦")) return value;
        return `₦${value}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Recommended Investors</h1>
                    <p className="text-gray-500">AI-curated matches based on your business profile and needs</p>
                </div>

            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search investors by name, focus, or location..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className={`gap-2 ${isFiltersOpen ? 'bg-gray-100' : ''}`}
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    >
                        <Filter className="w-4 h-4" /> Filters
                    </Button>
                </div>

                {isFiltersOpen && (
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg space-y-4 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Investor Type</label>
                                <select
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    value={selectedType || ""}
                                    onChange={(e) => setSelectedType(e.target.value || null)}
                                >
                                    <option value="">All Types</option>
                                    {INVESTOR_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Placeholder for future filters */}
                        </div>

                        <div className="flex justify-end">
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                )}

                {hasActiveFilters && !isFiltersOpen && (
                    <div className="flex gap-2 flex-wrap">
                        {searchQuery && (
                            <Badge variant="secondary" className="gap-1 pl-2">
                                Search: {searchQuery}
                                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                            </Badge>
                        )}
                        {selectedType && (
                            <Badge variant="secondary" className="gap-1 pl-2">
                                Type: {selectedType}
                                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedType(null)} />
                            </Badge>
                        )}
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground" onClick={clearFilters}>
                            Clear all
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!investors ? (
                    // Loading skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
                    ))
                ) : investors.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No investors found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        <Button variant="link" onClick={clearFilters}>
                            Clear all filters
                        </Button>
                    </div>
                ) : (
                    investors.map((investor) => (
                        <div key={investor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {investor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{investor.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            {investor.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-bold text-green-600">{investor.matchScore}% Match</span>
                                    <span className="text-xs text-gray-400">{investor.type}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {investor.description}
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Focus Areas:</span>
                                    <div className="flex gap-1">
                                        {investor.focus.slice(0, 2).map((area, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                                {area}
                                            </span>
                                        ))}
                                        {investor.focus.length > 2 && (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">+{investor.focus.length - 2}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Cheque Size:</span>
                                    <span className="font-medium text-gray-900">
                                        {formatCurrency(investor.minCheque)} - {formatCurrency(investor.maxCheque)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button className="flex-1 gap-2">
                                    Connect <ArrowRight className="w-4 h-4" />
                                </Button>
                                <Link
                                    href={`/dashboard/matching/investor/${investor.id}`}
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-10 px-3"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
