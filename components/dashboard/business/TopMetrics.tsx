import { TrendingUp, Users, Briefcase, CircleDollarSign, Loader2, ArrowUpRight, CheckCircle, MessageSquare } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export function TopMetrics() {
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const profileViewsCount = useQuery(
        api.businessProfile.getProfileViewsCount,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );
    const verificationScore = useQuery(
        api.verificationScore.calculateVerificationScore,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );

    if (profileViewsCount === undefined || verificationScore === undefined) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse h-32"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Profile Views */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Directory Visibility</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{profileViewsCount || 0}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Lifetime profile views</p>
            </div>

            {/* Card 2: Verification Score */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Compliance Score</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{verificationScore.totalPercentage}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Current verification level: {verificationScore.tier}</p>
            </div>

            {/* Card 3: Profile Completeness */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-50 rounded-xl">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Directory Status</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">Active</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Your profile is visible to the public</p>
            </div>
        </div>
    );
}
