"use client";

import { Search, Filter, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OpportunitiesPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Funding Opportunities</h1>
                    <p className="text-text-secondary">Discover funding programs and grants for your business</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <Input
                            placeholder="Search opportunities..."
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>

                <div className="text-center py-16">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Opportunities Available</h3>
                    <p className="text-gray-500">Check back soon for new funding opportunities</p>
                </div>
            </div>
        </div>
    );
}
