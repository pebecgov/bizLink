"use client";

import { Bell, Mail, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function NotificationSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Notification Preferences</h1>
                <p className="text-text-secondary">Choose how you want to be notified</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-medium text-text-primary">Email Notifications</p>
                                <p className="text-sm text-text-secondary">Receive updates via email</p>
                            </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between py-4 border-b">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-medium text-text-primary">Push Notifications</p>
                                <p className="text-sm text-text-secondary">Receive push notifications</p>
                            </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-medium text-text-primary">SMS Notifications</p>
                                <p className="text-sm text-text-secondary">Receive text messages</p>
                            </div>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
