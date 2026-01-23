"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Users, Building, TrendingUp, DollarSign, Globe, BarChart } from "lucide-react";
import { BusinessDashboard } from "@/components/dashboard/business/BusinessDashboard";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { UpgradeCard } from "@/components/dashboard/business/UpgradeCard";
export default function Dashboard() {
  const { user } = useUser();
  const convexUser = useQuery(api.users.getCurrentUser);
  const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);

  // Loading state
  if (!user || convexUser === undefined) {
    return <div>Loading dashboard...</div>;
  }

  // --- BUSINESS OWNER DASHBOARD ---
  if (convexUser?.role === "business_owner") {
    return <BusinessDashboard />;
  }

  // --- DEFAULT DASHBOARD (For now, kept as fallback/other roles) ---
  const stats = [
    {
      icon: Users,
      label: "Total Profile Visitors",
      value: "1,234",
      description: "Lifetime visibility across the platform",
      color: "bg-primary-green",
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Premium Upsell - Only for free tier */}
      {myBusiness?.plan !== "premium" && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <UpgradeCard />
        </section>
      )}

      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-800 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
              </h1>
              <div className="translate-y-0.5">
                <TierBadge plan={myBusiness?.plan} />
              </div>
            </div>
            <p className="text-green-50/90 mt-2 text-lg">
              Monitor your business presence and track how partners find you.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Column */}
        <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <div className={`${stat.color} p-4 rounded-2xl shadow-green mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
                    {stat.label}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-gray-900 tracking-tighter">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm mt-4 font-medium">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Column */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart className="w-6 h-6 text-primary-green" />
                Recent Profile Visits
              </h2>
              <span className="px-3 py-1 bg-green-50 text-primary-green text-xs font-bold rounded-full">
                Live Updates
              </span>
            </div>

            <div className="space-y-4 flex-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50/80 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100/50">
                    <Users className="w-6 h-6 text-primary-green" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">New profile view recorded</p>
                    <p className="text-xs text-gray-500 mt-0.5">A visitor from Lagos recently viewed your profile</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{i * 15} min ago</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50">
              <p className="text-center text-xs text-gray-400 font-medium">
                Keep your profile updated to attract more visitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

