"use client";

import { BarChart, ChevronRight } from "lucide-react";

export function DealPipeline() {
    const stages = [
        { name: "Leads", count: 35, color: "bg-gray-200 text-gray-600" },
        { name: "Contracts", count: 12, color: "bg-purple-100 text-purple-600" },
        { name: "Closed", count: 23, color: "bg-green-100 text-green-600" },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-gray-600" />
                    Deal Pipeline
                </h2>
                <div className="text-right">
                    <p className="text-xs text-gray-400">Total Pipeline Value</p>
                    <p className="text-lg font-bold text-green-600">$47M</p>
                </div>
            </div>

            {/* Funnel Visualization */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-8">
                {stages.map((stage, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center relative group">
                        <div className={`w-full h-12 flex items-center justify-center font-bold text-lg rounded-lg mb-2 ${stage.color} relative z-10 transition-transform group-hover:-translate-y-1`}>
                            {stage.count}
                        </div>
                        <p className="text-xs font-medium text-gray-500 text-center">{stage.name}</p>

                        {/* Connector line */}
                        {index < stages.length - 1 && (
                            <div className="hidden md:block absolute top-6 -right-1/2 w-full h-0.5 bg-gray-100 -z-0"></div>
                        )}

                        {/* Mobile arrow */}
                        {index < stages.length - 1 && (
                            <div className="md:hidden w-full flex justify-center py-2">
                                <ChevronRight className="w-4 h-4 text-gray-300 transform rotate-90" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pipeline Metrics */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm">
                    <span className="text-gray-500">Conversion Rate: </span>
                    <span className="font-bold text-gray-900">22%</span>
                    <span className="text-xs text-green-600 ml-2">(+5% vs Industry)</span>
                </div>
                <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                    View Full Pipeline
                </button>
            </div>
        </div>
    );
}

