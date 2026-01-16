"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function ProductsServicesSection() {
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);
    const [isLoading, setIsLoading] = useState(false);

    if (businessProfile === undefined) {
        return (
            <div className="space-y-8 animate-in fade-in">
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Products & Services</h2>
                <p className="text-sm text-gray-500 mt-2">List your products and services</p>
            </div>

            <div className="text-center py-12 text-gray-500">
                <p>Products and services management coming soon...</p>
                <p className="text-sm mt-2">This section will allow you to add and manage your product catalog.</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    disabled={isLoading}
                    className="bg-primary-green hover:bg-green-700 text-white"
                >
                    Save Section
                </Button>
            </div>
        </div>
    );
}
