"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Building2, MapPin, Users, TrendingUp, Search, Filter, ChevronRight, Verified, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";

export default function PublicBusinessesPage() {
    const businesses = useQuery(api.businessProfile.getAllBusinesses);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedStage, setSelectedStage] = useState("");

    // Get unique values for filters
    const sectors = [...new Set(businesses?.map(b => b.sector).filter(Boolean) || [])];
    const states = [...new Set(businesses?.map(b => b.state).filter(Boolean) || [])];
    const stages = [...new Set(businesses?.map(b => b.businessStage).filter(Boolean) || [])];

    // Filter businesses
    const filteredBusinesses = businesses?.filter(b => {
        if (!b.businessName) return false;
        if (searchQuery && !b.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !(b.companyDescription || "").toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedSector && b.sector !== selectedSector) return false;
        if (selectedState && b.state !== selectedState) return false;
        if (selectedStage && b.businessStage !== selectedStage) return false;
        return true;
    }) || [];

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedSector("");
        setSelectedState("");
        setSelectedStage("");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 pt-28 pb-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Discover Nigerian Businesses
                        </h1>
                        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
                            Explore verified businesses across Nigeria ready for investment opportunities and partnerships
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search businesses by name or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-green-300 shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 max-w-7xl py-8">
                {/* Stats Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">
                            {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Business' : 'Businesses'} Listed
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white"
                        >
                            <option value="">All Sectors</option>
                            {sectors.map(sector => (
                                <option key={sector} value={sector}>{sector}</option>
                            ))}
                        </select>

                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white"
                        >
                            <option value="">All States</option>
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white"
                        >
                            <option value="">All Stages</option>
                            {stages.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>

                        {(searchQuery || selectedSector || selectedState || selectedStage) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {businesses === undefined && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-white rounded-xl animate-pulse shadow-sm"></div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {businesses !== undefined && filteredBusinesses.length === 0 && (
                    <div className="text-center py-16">
                        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Businesses Found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchQuery || selectedSector || selectedState
                                ? "Try adjusting your search or filters"
                                : "No businesses have been listed yet"}
                        </p>
                        {(searchQuery || selectedSector || selectedState) && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Business Cards */}
                {businesses !== undefined && filteredBusinesses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBusinesses.map((business) => (
                            <div
                                key={business._id}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300 group"
                            >
                                {/* Card Header */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                                                    {business.businessName}
                                                </h3>
                                                {business.verificationStatus === "verified" && (
                                                    <Verified className="w-4 h-4 text-blue-500" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {business.state || "Nigeria"}
                                                {business.lga && `, ${business.lga}`}
                                            </div>
                                        </div>
                                        {business.businessStage && (
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${business.businessStage === "Startup" ? "bg-purple-100 text-purple-700" :
                                                business.businessStage === "Growth" ? "bg-blue-100 text-blue-700" :
                                                    "bg-green-100 text-green-700"
                                                }`}>
                                                {business.businessStage}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
                                        {business.companyDescription || "No description provided."}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {business.sector && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                {business.sector}
                                            </span>
                                        )}
                                        {business.seekingFunding && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <TrendingUp className="w-3 h-3" />
                                                Seeking Investment
                                            </span>
                                        )}
                                    </div>

                                    {/* Business Stats */}
                                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-3 border-t border-gray-100">
                                        {business.numberOfEmployees && (
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{business.numberOfEmployees}</span>
                                            </div>
                                        )}
                                        {business.fundingAmount && (
                                            <div className="font-semibold text-green-600">
                                                {business.fundingAmount}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                                    <Link
                                        href={`/businesses/${business._id}`}
                                        className="w-full flex items-center justify-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
                                    >
                                        View Business Profile
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 mt-12">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to List Your Business?
                    </h2>
                    <p className="text-green-100 mb-8 text-lg">
                        Join hundreds of Nigerian businesses connecting with investors through PEBEC BizLink
                    </p>
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-xl"
                    >
                        Register Your Business
                        <ExternalLink className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
