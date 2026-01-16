"use client";

import { Target, Mail, FileText, TrendingUp, Clock } from "lucide-react";

export function RecentActivity() {
    const activities = [
        {
            icon: Target,
            title: "New business match: TechStart Lagos",
            time: "2 hours ago",
            color: "bg-green-100 text-green-600"
        },
        {
            icon: Mail,
            title: "Message from AgriCorp: Pitch deck attached",
            time: "5 hours ago",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: FileText,
            title: "Company X submitted Q4 financials",
            time: "1 day ago",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: TrendingUp,
            title: "5 new businesses in your sector today",
            time: "2 days ago",
            color: "bg-yellow-100 text-yellow-600"
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

            <div className="space-y-4">
                {activities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                            <div className={`${activity.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                                    {activity.title}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
