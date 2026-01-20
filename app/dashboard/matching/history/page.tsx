"use client";

import { Calendar, CheckCircle, Clock, FileText, Mail } from "lucide-react";

// Mock history data
const MATCH_HISTORY = [
    {
        id: "1",
        event: "Connection Accepted",
        investor: "Green Horizon Partners",
        date: "2024-03-01",
        time: "10:30 AM",
        details: "You accepted the optimal match connection request.",
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100"
    },
    {
        id: "2",
        event: "Request Sent",
        investor: "TechGrowth Capital",
        date: "2024-03-10",
        time: "02:15 PM",
        details: "You sent a connection request to TechGrowth Capital.",
        icon: Mail,
        color: "text-blue-600",
        bg: "bg-blue-100"
    },
    {
        id: "3",
        event: "Profile Viewed",
        investor: "Pan-African Ventures",
        date: "2024-03-14",
        time: "09:45 AM",
        details: "Pan-African Ventures viewed your full business profile.",
        icon: FileText,
        color: "text-purple-600",
        bg: "bg-purple-100"
    },
    {
        id: "4",
        event: "Match Expired",
        investor: "Early Stage Fund A",
        date: "2024-02-20",
        time: "05:00 PM",
        details: "Connection request expired after 14 days without response.",
        icon: Clock,
        color: "text-gray-500",
        bg: "bg-gray-100"
    }
];

export default function MatchHistoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Match History</h1>
                <p className="text-gray-500">Timeline of your investor matching activities</p>
            </div>

            <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-8">
                {MATCH_HISTORY.map((item) => (
                    <div key={item.id} className="mb-10 ml-6 relative">
                        <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-10 ring-8 ring-white ${item.bg} ${item.color}`}>
                            <item.icon className="w-4 h-4" />
                        </span>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.event}</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 sm:mb-0">
                                {item.date} at {item.time}
                            </time>
                        </div>
                        <p className="mb-4 text-base font-normal text-gray-500">
                            with <span className="font-medium text-gray-900">{item.investor}</span>
                        </p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            {item.details}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
