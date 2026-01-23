"use client";

import { Users, MessageSquare, Handshake } from "lucide-react";

export default function InvestorConnectionsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Investor Connections</h1>
                    <p className="text-text-secondary">Connect with potential investors</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0</p>
                    </div>
                    <p className="text-sm text-text-secondary">Active Connections</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0</p>
                    </div>
                    <p className="text-sm text-text-secondary">Conversations</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Handshake className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">0</p>
                    </div>
                    <p className="text-sm text-text-secondary">Pending Requests</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Investor Connections</h3>
                    <p className="text-gray-500">Start connecting with investors interested in your business</p>
                </div>
            </div>
        </div>
    );
}
