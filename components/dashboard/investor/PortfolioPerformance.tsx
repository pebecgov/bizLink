"use client";

import { ArrowRight, TrendingUp, AlertCircle } from "lucide-react";

export function PortfolioPerformance() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio Performance</h2>

            {/* Placeholder for chart */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-6 flex items-center justify-center border border-gray-200">
                <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Portfolio Value Over Time</p>
                    <p className="text-sm text-gray-500 mt-2">Chart visualization coming soon</p>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Overall ROI</p>
                    <p className="text-2xl font-bold text-green-600">18.5%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 mb-1">Top Performer</p>
                    <p className="text-lg font-bold text-gray-900">Company X</p>
                    <p className="text-sm text-green-600 font-semibold">+45%</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Underperforming</p>
                        <p className="text-lg font-bold text-gray-900">2 companies</p>
                    </div>
                </div>
            </div>

            <button className="w-full py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                View Full Portfolio
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
