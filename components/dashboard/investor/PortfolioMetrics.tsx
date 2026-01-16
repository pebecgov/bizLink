"use client";

import { TrendingUp, TrendingDown, Briefcase, Target, MessageSquare } from "lucide-react";

export function PortfolioMetrics() {
    const metrics = [
        {
            icon: Briefcase,
            label: "Portfolio Value",
            value: "$12.5M",
            change: "+15%",
            changeLabel: "this quarter",
            trend: "up",
            color: "bg-primary-green"
        },
        {
            icon: Target,
            label: "Active Investments",
            value: "23",
            change: "2 new",
            changeLabel: "this month",
            trend: "up",
            color: "bg-accent-blue"
        },
        {
            icon: Target,
            label: "New Matches",
            value: "47",
            change: "12 high",
            changeLabel: "compatibility",
            trend: "neutral",
            color: "bg-gold"
        },
        {
            icon: MessageSquare,
            label: "Messages",
            value: "18",
            change: "5 require",
            changeLabel: "response",
            trend: "neutral",
            color: "bg-dark-green"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => {
                const Icon = metric.icon;
                const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;

                return (
                    <div
                        key={metric.label}
                        className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${metric.color} p-3 rounded-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            {metric.trend !== "neutral" && (
                                <TrendIcon className={`w-5 h-5 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                            )}
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 mb-2">
                            {metric.label}
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 mb-2">
                            {metric.value}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-sm font-semibold ${metric.trend === "up" ? "text-green-600" : "text-gray-600"}`}>
                                {metric.change}
                            </span>
                            <span className="text-xs text-gray-500">
                                {metric.changeLabel}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
