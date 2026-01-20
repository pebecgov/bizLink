"use client";

import { use } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { MilestoneChat } from "@/components/dashboard/shared/MilestoneChat";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function ConnectionChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const conversationId = id as Id<"conversations">;

    return (
        <div className="h-[calc(100vh-140px)]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Active Engagement</h1>
                    <p className="text-gray-500 text-sm">Manage your milestones and documents in real-time.</p>
                </div>
            </div>

            <div className="h-full max-w-5xl mx-auto">
                <MilestoneChat conversationId={conversationId} />
            </div>
        </div>
    );
}
