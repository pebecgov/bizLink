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
    const [showFundingModal, setShowFundingModal] = useState(false);
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const verificationScore = useQuery(
        api.verificationScore.calculateVerificationScore,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );

    // Show funding preferences modal on first visit if not set
    const shouldShowModal = myBusiness && myBusiness.seekingFunding === undefined && !showFundingModal;

    // Show verification banner if seeking funding
    const shouldShowBanner = myBusiness?.seekingFunding === true && verificationScore;

    return (
        <div className="space-y-8 pb-12">
            {/* Funding Preferences Modal (First-time users) */}
            {shouldShowModal && myBusiness ? (
                <FundingPreferencesModal
                    businessId={myBusiness._id}
                    onClose={() => setShowFundingModal(true)}
                    currentPercentage={verificationScore?.totalPercentage || 0}
                />
            ) : null}

            {/* Only show dashboard content if funding preference has been set */}
            {!shouldShowModal && (
                <>
                    {/* Header / Welcome */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
                        <p className="text-gray-500">Monitor your performance and manage investor relations</p>
                    </div>


                    {/* Row 1: Top Metrics */}
                    <section>
                        <TopMetrics seekingFunding={myBusiness?.seekingFunding} />
                    </section>
                    {/* Verification Progress Banner (Seeking Funding Users) */}
                    {shouldShowBanner && (
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

                    {/* Row 2: Verification */}
                    {/* <section>
                        <VerificationWidget />
                    </section> */}

                    {/* Row 3: Financials */}
                    {myBusiness?.seekingFunding === true && (
                        <section>
                            <FinancialCards />
                        </section>
                    )}

                    {/* Layout for users seeking funding (Full Dashboard) */}
                    {myBusiness?.seekingFunding === true ? (
                        <>
                            {/* Row 4: Messages */}
                            <section>
                                <MessagesWidget />
                            </section>

                            {/* Row 5: AI Matches */}
                            <section>
                                <AIMatches />
                            </section>

                            {/* Info Grid: Pipeline & Events */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <DealPipeline />
                                </div>
                                <div className="space-y-8">
                                    <EventsWidget />
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Layout for users NOT seeking funding (Simplified Dashboard) */
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <MessagesWidget />
                            <EventsWidget />
                        </div>
                    )}

                    {/* Row 10: Quick Actions */}
                    <section>
                        <QuickActions seekingFunding={myBusiness?.seekingFunding} />
                    </section>
                </>
            )}

        </div>
    );
}
