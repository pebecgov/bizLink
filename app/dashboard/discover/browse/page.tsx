"use client";

import { Search, Filter, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export default function BrowseBusinessesPage() {
    const router = useRouter();
    const businesses = useQuery(api.businessProfile.getAllBusinesses);
    const [searchQuery, setSearchQuery] = useState("");
    const toggleSave = useMutation(api.investorActions.toggleSaveBusiness);

    // Initial simple client-side search
    const filteredBusinesses = businesses?.filter(b => {
        const query = searchQuery.toLowerCase();
        return (
            b.businessName?.toLowerCase().includes(query) ||
            b.sector?.toLowerCase().includes(query) ||
            b.companyDescription?.toLowerCase().includes(query)
        );
    }) || [];

    const handleSave = async (businessId: Id<"businesses">) => {
        // Optimistic UI updates or toast notifications would go here
        await toggleSave({ businessId });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Browse All Businesses</h1>
                    <p className="text-gray-500">Explore businesses across all sectors and regions</p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search businesses by name, sector, or keywords..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" /> Filters
                </Button>
            </div>

            {businesses === undefined ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : filteredBusinesses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500">No businesses found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBusinesses.map((business) => (
                        <div key={business._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                            <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 relative">
                                {business.logoUrl ? (
                                    <img src={business.logoUrl} alt={business.businessName} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400">No Image</span>
                                )}
                                <button
                                    onClick={() => handleSave(business._id)}
                                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full truncate max-w-[120px]">
                                        {business.sector || "Uncategorized"}
                                    </span>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {business.businessStage || "N/A"}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{business.businessName}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                    <MapPin className="w-3 h-3" />
                                    {business.headOfficeAddress?.city || business.state || "Nigeria"}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                                    {business.companyDescription || "No description provided."}
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full text-sm mt-auto"
                                    onClick={() => router.push(`/businesses/${business._id}`)}
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
