"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { TierBadge } from "../TierBadge";
import { UpgradeCard } from "./UpgradeCard";
import { TopMetrics } from "./TopMetrics";
import { RecentActivityWidget } from "./RecentActivityWidget";

export function BusinessDashboard() {
    const { user } = useUser();
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);

    return (
<<<<<<< HEAD
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {myBusiness?.plan !== "premium" && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <UpgradeCard />
                </section>
=======
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
>>>>>>> origin
            )}
            {/* Header / Welcome */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-800 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back, {user?.firstName || "Business Owner"}!
                        </h1>
                        <div className="translate-y-0.5">
                            <TierBadge plan={myBusiness?.plan} />
                        </div>
                    </div>
                    <p className="text-green-50/90 text-lg italic mt-1">
                        "Your digital presence is the bridge to global partnerships."
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Visibility Metric */}
                <div className="lg:col-span-1">
                    <TopMetrics />
                </div>

                {/* Recent Profile Visits Activity */}
                <div className="lg:col-span-2">
                    <RecentActivityWidget businessId={myBusiness?._id} />
                </div>
            </div>
        </div>
    );
}
