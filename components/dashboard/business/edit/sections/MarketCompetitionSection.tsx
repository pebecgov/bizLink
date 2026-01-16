"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function MarketCompetitionSection() {
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);

    if (businessProfile === undefined) {
        return <div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Market & Competition</h2>
                <p className="text-sm text-gray-500 mt-2">Provide market analysis and competitive information</p>
            </div>
            <div className="text-center py-12 text-gray-500">
                Market and competition analysis coming soon...
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button className="bg-primary-green hover:bg-green-700 text-white">Save Section</Button>
            </div>
        </div>
    );
}
