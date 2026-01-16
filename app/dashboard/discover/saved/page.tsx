"use client";

import { Save, Bell, Trash2, Search, Heart, MapPin, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function SavedSearchesPage() {
    const savedSearches = useQuery(api.investorActions.getSavedSearches);
    const savedBusinesses = useQuery(api.investorActions.getSavedBusinesses);
    const deleteSearch = useMutation(api.investorActions.deleteSavedSearch);
    const toggleSave = useMutation(api.investorActions.toggleSaveBusiness);

    const handleDeleteSearch = async (id: Id<"saved_searches">) => {
        await deleteSearch({ id });
    };

    const handleRemoveBusiness = async (businessId: Id<"businesses">) => {
        await toggleSave({ businessId });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
                    <p className="text-gray-500">Manage your saved searches and watched businesses</p>
                </div>
            </div>

            {/* Saved Searches Section */}
            <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-500" /> Saved Searches
                </h2>

                {savedSearches === undefined ? (
                    <div className="flex gap-4">
                        <div className="h-10 w-40 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                ) : savedSearches.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-500">
                        No saved searches yet. Go to Advanced Search to save criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedSearches.map((search) => (
                            <div key={search._id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-start hover:shadow-sm transition-shadow">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{search.name}</h3>
                                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                                        {search.criteria.keywords && <p>Keywords: {search.criteria.keywords}</p>}
                                        {search.criteria.sector && <p>Sector: {search.criteria.sector}</p>}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteSearch(search._id)}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Watchlist Section */}
            <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" /> Watched Businesses
                </h2>

                {savedBusinesses === undefined ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2].map(i => <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>)}
                    </div>
                ) : savedBusinesses.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-500 mb-4">You haven&apos;t added any businesses to your watchlist yet.</p>
                        <Button variant="outline" onClick={() => window.location.href = '/dashboard/discover/browse'}>
                            Browse Businesses
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedBusinesses.map((business) => (
                            <div key={business._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 relative">
                                    {business.logoUrl ? (
                                        <img src={business.logoUrl} alt={business.businessName} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                    <button
                                        onClick={() => business._id && handleRemoveBusiness(business._id)}
                                        className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 hover:bg-gray-100 transition-colors shadow-sm"
                                        title="Remove from watchlist"
                                    >
                                        <Trash2 className="w-4 h-4" />
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

                                    <Button variant="outline" className="w-full text-sm mt-auto">View Profile</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
