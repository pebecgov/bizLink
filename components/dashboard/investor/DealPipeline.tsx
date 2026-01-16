"use client";

import { Eye, MessageCircle, FileSearch, Handshake, CheckCircle, TrendingUp } from "lucide-react";

export function DealPipeline() {
    const stages = [
        { name: "Watching", count: 35, icon: Eye, color: "bg-gray-500" },
        { name: "Contacted", count: 18, icon: MessageCircle, color: "bg-blue-500" },
        { name: "Due Diligence", count: 8, icon: FileSearch, color: "bg-yellow-500" },
        { name: "Negotiating", count: 5, icon: Handshake, color: "bg-orange-500" },
        { name: "Closing", count: 2, icon: CheckCircle, color: "bg-purple-500" },
        { name: "Invested", count: 23, icon: TrendingUp, color: "bg-green-500" }
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Deal Pipeline</h2>

            {/* Pipeline Stages */}
            <div className="mb-6 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max pb-2">
                    {stages.map((stage, index) => {
                        const Icon = stage.icon;
                        return (
                            <div key={stage.name} className="flex items-center">
                                <div className="flex flex-col items-center group cursor-pointer">
                                    <div className={`${stage.color} p-4 rounded-xl mb-2 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600 mb-1 whitespace-nowrap">
                                        {stage.name}
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {stage.count}
                                    </span>
                                </div>
                                {index < stages.length - 1 && (
                                    <div className="w-8 h-0.5 bg-gray-300 mx-2 mb-12"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pipeline Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Pipeline Value</p>
                    <p className="text-2xl font-bold text-gray-900">$47M</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                    <p className="text-2xl font-bold text-green-600">22%</p>
                </div>
            </div>
        </div>
    );
}
