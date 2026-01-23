"use client";

import { Settings, User, Lock, Globe } from "lucide-react";

export default function AccountSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Account Settings</h1>
                <p className="text-text-secondary">Manage your account preferences</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
                    <p className="text-gray-500">Configure your account preferences</p>
                </div>
            </div>
        </div>
    );
}
