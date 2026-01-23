"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Building2, MapPin, Users, TrendingUp, Search, Filter, ChevronRight, Verified, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { BUSINESS_STAGES } from "@/components/dashboard/business/lib/sectorData";
import { SECTORS } from "@/components/onboarding/constants/sectors";
import { NIGERIAN_STATES } from "@/components/onboarding/constants/locations";

export default function PublicBusinessesPage() {
    const businesses = useQuery(api.businessProfile.getAllBusinesses);
    const currentUser = useQuery(api.users.getCurrentUser);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedSubsector, setSelectedSubsector] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedLga, setSelectedLga] = useState("");
    const [selectedStage, setSelectedStage] = useState("");

    // Get filter options from constants
    const sectors = SECTORS.map(s => s.name);
    const states = NIGERIAN_STATES.map(s => s.name);

    // Get subsectors based on selected sector
    const subsectors = useMemo(() => {
        if (!selectedSector) return [];
        const sector = SECTORS.find(s => s.name === selectedSector);
        return sector ? sector.subsectors : [];
    }, [selectedSector]);

    // Get LGAs based on selected state
    const lgas = useMemo(() => {
        if (!selectedState) return [];
        const state = NIGERIAN_STATES.find(s => s.name === selectedState);
        return state ? state.lgas : [];
    }, [selectedState]);

    const stages = BUSINESS_STAGES.map(s => s.value);

    // Filter businesses
    const filteredBusinesses = businesses?.filter(b => {
        if (!b.businessName) return false;
        if (searchQuery && !b.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !(b.companyDescription || "").toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedSector && b.sector !== selectedSector) return false;
        if (selectedSubsector && b.subsector !== selectedSubsector) return false;
        if (selectedState && b.state !== selectedState) return false;
        if (selectedLga && b.lga !== selectedLga) return false;
        if (selectedStage && b.businessStage !== selectedStage) return false;
        return true;
    }) || [];

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedSector("");
        setSelectedSubsector("");
        setSelectedState("");
        setSelectedLga("");
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
                            Explore verified businesses across Nigeria ready for strategic partnerships and collaborations
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
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full">
                        <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold border-b border-gray-50 pb-2">
                            <Filter className="w-4 h-4" />
                            <span>Refine Businesses</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {/* Sector Filter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sector</label>
                                <select
                                    value={selectedSector}
                                    onChange={(e) => {
                                        setSelectedSector(e.target.value);
                                        setSelectedSubsector("");
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white"
                                >
                                    <option value="">All Sectors</option>
                                    {sectors.map(sector => (
                                        <option key={sector} value={sector}>{sector}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Subsector Filter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subsector</label>
                                <select
                                    disabled={!selectedSector}
                                    value={selectedSubsector}
                                    onChange={(e) => setSelectedSubsector(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                                >
                                    <option value="">{selectedSector ? "All Subsectors" : "Select Sector First"}</option>
                                    {subsectors.map(subsector => (
                                        <option key={subsector} value={subsector}>{subsector}</option>
                                    ))}
                                </select>
                            </div>

                            {/* State Filter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">State</label>
                                <select
                                    value={selectedState}
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);
                                        setSelectedLga("");
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white"
                                >
                                    <option value="">All States</option>
                                    {states.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            {/* LGA Filter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Local Government</label>
                                <select
                                    disabled={!selectedState}
                                    value={selectedLga}
                                    onChange={(e) => setSelectedLga(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                                >
                                    <option value="">{selectedState ? "All LGAs" : "Select State First"}</option>
                                    {lgas.map(lga => (
                                        <option key={lga} value={lga}>{lga}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {(searchQuery || selectedSector || selectedSubsector || selectedState || selectedLga || selectedStage) && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5"
                                >
                                    <span>Reset All Filters</span>
                                </button>
                            </div>
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
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                                                    {business.businessName}
                                                </h3>
                                                {business.verificationStatus === "verified" && (
                                                    <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate">
                                                    {business.state || "Nigeria"}
                                                    {business.lga && `, ${business.lga}`}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Business Logo */}
                                        <div className="flex-shrink-0">
                                            {business.logoUrl ? (
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-100 bg-white">
                                                    <img
                                                        src={business.logoUrl}
                                                        alt={`${business.businessName} logo`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 flex items-center justify-center">
                                                    <Building2 className="w-8 h-8 text-green-600" />
                                                </div>
                                            )}
                                        </div>
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
                                        {business.afcftaCompliant && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                <Verified className="w-3 h-3" />
                                                AfCFTA Ready
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
                                        {business.businessModel && (
                                            <div className="font-semibold text-green-600">
                                                {business.businessModel}
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
                        Join hundreds of Nigerian businesses expanding their reach through PEBEC BizLink
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
