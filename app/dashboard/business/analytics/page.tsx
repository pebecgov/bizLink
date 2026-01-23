"use client";

import { BarChart, TrendingUp, Users, Eye } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Business Analytics</h1>
                    <p className="text-text-secondary">Insights and performance metrics for your business</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0</p>
                    </div>
                    <p className="text-sm text-text-secondary">Profile Views</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0</p>
                    </div>
                    <p className="text-sm text-text-secondary">Connections</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0%</p>
                    </div>
                    <p className="text-sm text-text-secondary">Growth Rate</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                            <BarChart className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0</p>
                    </div>
                    <p className="text-sm text-text-secondary">Engagement Score</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center py-12">
                    <BarChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
                    <p className="text-gray-500 mb-6">Detailed analytics and insights will be available here</p>
                </div>
            </div>
        </div>
    );
}
