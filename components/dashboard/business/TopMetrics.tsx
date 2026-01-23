import { Users, ArrowUpRight } from "lucide-react";
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
        <div className="h-full">
            {/* Card 1: Profile Views */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-primary-green/10 rounded-2xl">
                            <Users className="w-8 h-8 text-primary-green" />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Profile Visitors</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-5xl font-black text-gray-900 tracking-tighter">{profileViewsCount || 0}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-4 font-medium leading-relaxed">
                        Your business profile visibility has grown since joining the platform.
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-primary-green font-bold text-xs">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Live Visibility</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
