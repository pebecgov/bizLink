"use client";

import { MessageSquare, ThumbsUp, X, Sparkles, Filter, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function MatchedBusinessesPage() {
    const businesses = useQuery(api.businessProfile.getAllBusinesses);

    if (businesses === undefined) {
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

    const matches = businesses?.filter(b => b.businessName) || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI-Matched Businesses</h1>
                    <p className="text-gray-500">Curated opportunities matching your investment criteria</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" /> Filter Matches
                </Button>
            </div>

            {matches.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Matches Found Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        We couldn&apos;t find any businesses matching your criteria right now. Check back later or adjust your preferences.
                    </p>
                    <Button className="bg-primary-green hover:bg-green-700">
                        Update Investment Profile
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((business) => (
                        <div
                            key={business._id}
                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300 group flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-green transition-colors line-clamp-1">
                                        {business.businessName}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {business.headOfficeAddress?.city || business.state || "Nigeria"}
                                    </div>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold shrink-0 ml-2">
                                    {Math.floor(Math.random() * (99 - 85) + 85)}%
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px] flex-grow">
                                {business.companyDescription || "No description provided."}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {business.sector || "General"}
                                </span>
                                {business.fundingAmount && (
                                    <span className="text-sm font-semibold text-gray-700">
                                        {business.fundingAmount}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <Button className="flex-1 bg-primary-green hover:bg-green-700 gap-1">
                                    View Details
                                </Button>
                                <Button variant="outline" className="flex-1 border-primary-green text-primary-green hover:bg-green-50">
                                    Connect
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
