"use client";

import { Eye, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WatchlistPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
                    <p className="text-gray-500">Track businesses you are interested in</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Watchlist is Empty</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Start exploring businesses and add them to your watchlist to track their progress and updates.
                </p>
                <Button className="bg-primary-green hover:bg-green-700">
                    Browse Businesses
                </Button>
            </div>
        </div>
    );
}
