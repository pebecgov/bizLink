"use client";

import { Search, MessageSquare, BarChart3, Settings, FileText, Headphones } from "lucide-react";

export function QuickActions() {
    const actions = [
        { icon: Search, label: "Search Businesses", color: "bg-green-600 hover:bg-green-700" },
        { icon: MessageSquare, label: "View Messages", color: "bg-blue-600 hover:bg-blue-700" },
        { icon: BarChart3, label: "Portfolio Review", color: "bg-purple-600 hover:bg-purple-700" },
        { icon: Settings, label: "Update Preferences", color: "bg-gray-600 hover:bg-gray-700" },
        { icon: FileText, label: "Market Reports", color: "bg-yellow-600 hover:bg-yellow-700" },
        { icon: Headphones, label: "Connect Support", color: "bg-orange-600 hover:bg-orange-700" }
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={action.label}
                            className={`${action.color} text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center gap-3 group`}
                        >
                            <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-center">
                                {action.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
