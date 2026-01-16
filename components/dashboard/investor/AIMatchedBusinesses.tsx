"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function AIMatchedBusinesses() {
    const businesses = useQuery(api.businessProfile.getAllBusinesses);

    if (businesses === undefined) {
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

    // Filter for businesses seeking funding or just take top results
    const matches = businesses?.filter(b => b.businessName).slice(0, 3).map(business => ({
        id: business._id,
        name: business.businessName || "Unnamed Business",
        // Mock score until we have real matching logic
        matchScore: Math.floor(Math.random() * (99 - 85) + 85),
        sector: business.sector || "Unspecified Sector",
        seeking: business.fundingAmount || "N/A",
        location: business.headOfficeAddress?.city || business.state || "Nigeria",
        description: business.companyDescription || "No description provided."
    })) || [];

    if (matches.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    AI-Matched Business Opportunities
                </h2>
                <p className="text-gray-500 py-8">
                    No matching businesses found at the moment.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    AI-Matched Business Opportunities
                </h2>
                <p className="text-sm text-gray-600">
                    Based on your preferences: {matches[0]?.sector}, {matches[0]?.location}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {matches.map((business) => (
                    <div
                        key={business.id}
                        className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300 group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-green transition-colors line-clamp-1">
                                        {business.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">{business.location}</p>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold shrink-0 ml-2">
                                    {business.matchScore}%
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                                {business.description}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {business.sector}
                                </span>
                                {business.seeking !== "N/A" && (
                                    <span className="text-sm font-semibold text-gray-700">
                                        {business.seeking}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 mt-auto">
                            <button className="flex-1 px-3 py-2 bg-primary-green text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                                View
                                <ExternalLink className="w-3 h-3" />
                            </button>
                            <button className="flex-1 px-3 py-2 border border-primary-green text-primary-green text-sm font-medium rounded-lg hover:bg-green-50 transition-colors">
                                Connect
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-medium rounded-lg hover:border-green-400 hover:text-primary-green hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                View All Matches ({businesses?.length || 0})
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
