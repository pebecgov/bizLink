import { Globe, TrendingUp, Info } from "lucide-react";

export function MarketIntel() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-0 opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Market Intelligence</h2>
                        <p className="text-xs text-gray-500">Sector: Technology • Location: Lagos, Nigeria</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Sector Growth Rate</span>
                            <span className="font-bold text-gray-900">18.4% <span className="text-xs text-green-600 ml-1">↑ 2.1%</span></span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-sm text-gray-500">Verified Partners</span>
                            <span className="font-bold text-gray-900">124 <span className="text-xs text-green-600 ml-1">New</span></span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Trending Now</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">AI/ML</span>
                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">Fintech</span>
                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">E-commerce</span>
                        </div>
                        <button className="text-xs font-semibold text-blue-600 mt-4 hover:underline">
                            View Full Q4 Report →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
