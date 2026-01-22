"use client";

import { Bell } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export function NotificationBell() {
    const router = useRouter();
    const unreadCount = useQuery(api.notifications.getUnreadCount);

    return (
        <button
            onClick={() => router.push("/dashboard/matching/requests")}
            className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            title="Notifications"
        >
            <Bell className="w-6 h-6" />
            {unreadCount !== undefined && unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white items-center justify-center text-[10px] text-white font-bold">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                </span>
            )}
        </button>
    );
}
