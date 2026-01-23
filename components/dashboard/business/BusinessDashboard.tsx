"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TopMetrics } from "./TopMetrics";
import { VerificationWidget } from "./VerificationWidget";
import { FinancialCards } from "./FinancialCards";
import { MessagesWidget } from "./MessagesWidget";
import { AIMatches } from "./AIMatches";
import { DealPipeline } from "./DealPipeline";
import { EventsWidget } from "./EventsWidget";
import { PerformanceChart } from "./PerformanceChart";
import { MarketIntel } from "./MarketIntel";
import { QuickActions } from "./QuickActions";
import { FundingPreferencesModal } from "./FundingPreferencesModal";
import { VerificationProgressBanner } from "./VerificationProgressBanner";

export function BusinessDashboard() {
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const verificationScore = useQuery(
        api.verificationScore.calculateVerificationScore,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Header / Welcome */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
                <p className="text-gray-500">Manage your business profile and monitor directory presence</p>
            </div>

            {/* Row 1: Top Metrics */}
            <section>
                <TopMetrics />
            </section>

            {/* Row 2: Verification Progress Banner */}
            {verificationScore && (
                <section>
                    <VerificationProgressBanner
                        percentage={verificationScore.totalPercentage}
                        tier={verificationScore.tier}
                        canReceiveInvestment={verificationScore.canReceiveInvestment}
                        missingCoreDocuments={verificationScore.missingCoreDocuments}
                        missingSectorDocuments={verificationScore.missingSectorDocuments}
                    />
                </section>
            )}

            {/* Discovery / Marketplace Row (New) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Messages Card */}
                <div className="space-y-8">
                    <MessagesWidget />
                </div>

                {/* Marketplace Insights / Events */}
                <div className="space-y-8">
                    <EventsWidget />
                </div>
            </div>

            {/* Business Intelligence / Market Intel */}
            <section>
                <MarketIntel />
            </section>

            {/* Quick Actions */}
            <section>
                <QuickActions />
            </section>
        </div>
    );
}
