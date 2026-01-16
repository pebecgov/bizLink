"use client";

import { TrendingUp, DollarSign, BarChart3, ArrowRight } from "lucide-react";

export function MarketIntelligence() {
    const insights = [
        {
            icon: TrendingUp,
            label: "Nigerian Tech Sector",
            value: "$2.5B raised in 2025",
            change: "↑45%",
            color: "text-green-600"
        },
        {
            icon: BarChart3,
            label: "Trending",
            value: "Fintech deals up 30%",
            change: "this quarter",
            color: "text-orange-600"
        },
        {
            icon: DollarSign,
            label: "Your sector avg deal size",
            value: "$2.8M",
            change: "",
            color: "text-blue-600"
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Market Intelligence</h2>

            <div className="space-y-4 mb-6">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className={`${insight.color} bg-white p-3 rounded-lg`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-600 mb-1">{insight.label}</p>
                                <p className="text-lg font-bold text-gray-900">{insight.value}</p>
                                {insight.change && (
                                    <p className="text-sm font-semibold text-green-600 mt-1">
                                        {insight.change}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                View Full Market Report
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
