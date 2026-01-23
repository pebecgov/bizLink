import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Users, BarChart, Clock } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";

export function RecentActivityWidget({ businessId }: { businessId?: Id<"businesses"> }) {
    const recentViews = useQuery(
        api.businessProfile.getRecentProfileViews,
        businessId ? { businessId } : "skip"
    );

    if (recentViews === undefined) {
        return (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-full">
                <div className="h-6 bg-gray-100 rounded w-1/3 mb-8"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-50 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
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
                {recentViews && recentViews.length > 0 ? (
                    recentViews.map((view) => (
                        <div key={view._id} className="flex items-center gap-4 p-4 hover:bg-gray-50/80 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100/50">
                                <Users className="w-6 h-6 text-primary-green" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">New profile view recorded</p>
                                <p className="text-xs text-gray-500 mt-0.5">A visitor recently engaged with your business profile.</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    <p className="text-[10px] font-bold uppercase tracking-tighter">
                                        {formatDistanceToNow(view.timestamp, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-medium font-sm">No profile views yet</p>
                        <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Complete your profile to increase visibility to potential partners.</p>
                    </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50">
                <p className="text-center text-xs text-gray-400 font-medium">
                    Profile engagement data is updated in real-time.
                </p>
            </div>
        </div>
    );
}
