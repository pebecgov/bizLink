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
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {myBusiness?.plan !== "premium" && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <UpgradeCard />
                </section>
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
