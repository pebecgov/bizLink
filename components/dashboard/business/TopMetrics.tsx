import { TrendingUp, Users, Briefcase, CircleDollarSign } from "lucide-react";

export function TopMetrics() {
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
                    <span className="text-3xl font-bold text-gray-900">0</span>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">↑ 0%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">0 % this month</p>
            </div>

            {/* Card 2: Investor Interest */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-50 rounded-xl">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Investor Interest</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">0</span>
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">0</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">New this week</p>
            </div>

            {/* Card 3: Active Deals */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Active Deals</h3>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">0</span>
                    <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">↑ 0</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">3 new opportunities</p>
            </div>

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
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">↑ 0%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Last 30 days</p>
            </div>
        </div>
    );
}
