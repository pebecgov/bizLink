"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { NotificationBell } from "./NotificationBell";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const currentUser = useQuery(api.users.getCurrentUser);

    if (currentUser === undefined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 rounded-full border-4 border-primary-green border-t-gold animate-spin"></div>
            </div>
        );
    }

    if (currentUser === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark">
                <div className="w-12 h-12 rounded-full border-4 border-primary-green border-t-gold animate-spin"></div>
                <p className="mt-4 text-white">Syncing profile...</p>
            </div>
        );
    }

    if (currentUser.role === "user") {
        router.push("/onboarding");
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark">
                <div className="w-12 h-12 rounded-full border-4 border-primary-green border-t-gold animate-spin"></div>
                <p className="mt-4 text-white">Redirecting to onboarding...</p>
            </div>
        );
    }

    return (
        <div className="h-screen bg-bg-secondary flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Menu className="w-6 h-6 text-text-primary" />
                            </button>
                            <h1 className="text-xl font-bold text-text-primary">
                                Dashboard
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <NotificationBell />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
