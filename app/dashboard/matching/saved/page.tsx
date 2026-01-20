"use client";

import { Search, MapPin, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

// Mock data for saved investors (subset of recommended)
const MOCK_SAVED_INVESTORS = [
    {
        id: "2",
        name: "Global Impact Fund",
        type: "Impact Investor",
        location: "Nairobi, Kenya",
        focus: ["Renewable Energy", "Healthcare"],
        savedDate: "2024-03-12",
        description: "Supporting businesses that drive sustainable development and social impact."
    },
    {
        id: "5",
        name: "Future Africa Syndicate",
        type: "Syndicate",
        location: "Remote",
        focus: ["Logistics", "Mobility"],
        savedDate: "2024-03-10",
        description: "Community-driven investment vehicle backing infrastructure for the future."
    }
];

export default function SavedInvestorsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSaved = MOCK_SAVED_INVESTORS.filter(inv =>
        inv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Saved Investors</h1>
                    <p className="text-gray-500">Investors you have bookmarked for later</p>
                </div>
            </div>

            <div className="flex max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Search saved investors..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSaved.map((investor) => (
                    <div key={investor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative group">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
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

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {investor.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {investor.focus.map((area, i) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                    {area}
                                </span>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                            <span className="text-xs text-gray-400">Saved on {investor.savedDate}</span>
                            <Link
                                href={`/dashboard/matching/investor/${investor.id}`}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSaved.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No saved investors</h3>
                    <p className="text-gray-500">Bookmark investors from the Recommended page to see them here.</p>
                </div>
            )}
        </div>
    );
}
