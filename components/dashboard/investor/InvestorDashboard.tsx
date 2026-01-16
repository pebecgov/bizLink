"use client";

import { useUser } from "@clerk/nextjs";
import { TrendingUp } from "lucide-react";
import { PortfolioMetrics } from "./PortfolioMetrics";
import { AIMatchedBusinesses } from "./AIMatchedBusinesses";
import { DealPipeline } from "./DealPipeline";
import { PortfolioPerformance } from "./PortfolioPerformance";
import { RecentActivity } from "./RecentActivity";
import { MarketIntelligence } from "./MarketIntelligence";
import { QuickActions } from "./QuickActions";

export function InvestorDashboard() {
    const { user } = useUser();

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-2">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user?.firstName || "Investor"}!
                        </h1>
                        <p className="text-white/90 mt-1 text-lg">
                            Discover opportunities, manage your pipeline, and grow your portfolio.
                        </p>
                    </div>
                </div>
            </div>

            {/* Top Metrics */}
            <PortfolioMetrics />

            {/* AI-Matched Businesses */}
            <AIMatchedBusinesses />

            {/* Deal Pipeline */}
            <DealPipeline />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Portfolio Performance */}
                <PortfolioPerformance />

                {/* Recent Activity */}
                <RecentActivity />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Market Intelligence */}
                <MarketIntelligence />

                {/* Quick Actions */}
                <QuickActions />
            </div>
        </div>
    );
}
