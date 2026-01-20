import { TrendingUp, Users, Briefcase, CircleDollarSign, Loader2, ArrowUpRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export function TopMetrics() {
    const router = useRouter();
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const myConnections = useQuery(api.connections.getMyConnections);
    const profileViewsCount = useQuery(
        api.businessProfile.getProfileViewsCount,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );

    if (myConnections === undefined || profileViewsCount === undefined) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse h-32"></div>
                ))}
            </div>
        );
    }

    const pendingRequests = myConnections.filter(c => c.status === "lead" && c.businessId === myBusiness?._id).length;
    const activeDeals = myConnections.filter(c => ["connected", "contract"].includes(c.status)).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Profile Views */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{profileViewsCount}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Lifetime views</p>
            </div>

            {/* Card 2: Investor Interest */}
            <button
                onClick={() => router.push("/dashboard/matching/requests")}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all text-left group"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    {pendingRequests > 0 ? (
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                        </span>
                    ) : (
                        <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Investor Interest</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{pendingRequests}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Pending connection requests</p>
            </button>

            {/* Card 3: Active Deals */}
            <button
                onClick={() => router.push("/dashboard/messages")}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all text-left group"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Active Deals</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{activeDeals}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Connected and in negotiation</p>
            </button>

            {/* Card 4: Total Transaction */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <CircleDollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Total Transaction</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₦0</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Placeholder for payments</p>
            </div>
        </div>
    );
}
