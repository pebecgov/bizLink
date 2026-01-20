"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { roleConfigs } from "./SidebarConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Image from "next/image";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const pathname = usePathname();
    const currentUser = useQuery(api.users.getCurrentUser);
    const unreadNotifications = useQuery(api.notifications.getMyNotifications)?.filter(n => !n.isRead) || [];
    const myConnections = useQuery(api.connections.getMyConnections);

    const getBadgeCount = (label: string) => {
        if (label === "Investor Matching") {
            // Use actual connection data to be consistent with TopMetrics
            if (!myConnections) return 0;
            return myConnections.filter(c =>
                c.status === "lead" &&
                c.business?.ownerId === currentUser?.clerkId &&
                c.initiatedBy !== currentUser?.clerkId
            ).length;
        }
        if (label === "Messages & Networking" || label === "Messages") {
            return unreadNotifications.filter(n => ["message", "milestone"].includes(n.type)).length;
        }
        if (label === "Notifications") {
            return unreadNotifications.length;
        }
        return 0;
    };

    const getSubItemBadgeCount = (label: string) => {
        if (label === "Match Requests") {
            // Consistent with parent
            if (!myConnections) return 0;
            return myConnections.filter(c =>
                c.status === "lead" &&
                c.business?.ownerId === currentUser?.clerkId &&
                c.initiatedBy !== currentUser?.clerkId
            ).length;
        }
        if (label === "Inbox" || label === "Active Conversations") {
            return unreadNotifications.filter(n => ["message", "milestone"].includes(n.type)).length;
        }
        return 0;
    };

    // Map DB role to SidebarConfig role
    const getRoleString = (role?: string) => {
        switch (role) {
            case "admin": return "SUPER ADMIN";
            case "system_admin": return "SYSTEM ADMIN";
            case "business_owner": return "BUSINESS USER";
            case "investor": return "INVESTOR USER";
            case "regulator": return "REGULATORY OFFICER";
            case "verification_officer": return "VERIFICATION OFFICER";
            case "data_analyst": return "DATA ANALYST";
            default: return "BUSINESS USER"; // Fallback or strict mode could return null
        }
    };

    const userRoleConfig = getRoleString(currentUser?.role);
    const currentRoleConfig = roleConfigs.find((config) => config.role === userRoleConfig);

    const toggleExpanded = (label: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(label)) {
            newExpanded.delete(label);
        } else {
            newExpanded.add(label);
        }
        setExpandedItems(newExpanded);
    };

    const isActive = (path?: string) => {
        if (!path) return false;
        return pathname === path;
    };

    // Show skeleton if loading
    if (currentUser === undefined) {
        return (
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } flex flex-col`}
            >
                <div className="p-6 border-b border-gray-200 animate-pulse">
                    <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                </div>
                <div className="p-4 space-y-4 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-xl"></div>
                    <div className="h-8 bg-gray-200 rounded-xl"></div>
                    <div className="h-8 bg-gray-200 rounded-xl"></div>
                </div>
            </aside>
        );
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    } flex flex-col`}
            >
                {/* Header */}
                <div className="border-b border-gray-200">
                    <div className="flex items-center justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="BizLink Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                        {currentRoleConfig?.items.map((item) => {
                            const Icon = item.icon;
                            const isExpanded = expandedItems.has(item.label);
                            const hasSubItems = item.subItems && item.subItems.length > 0;

                            return (
                                <div key={item.label}>
                                    {hasSubItems ? (
                                        <>
                                            <button
                                                onClick={() => toggleExpanded(item.label)}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-very-light-green hover:text-primary-green rounded-xl transition-all duration-200 group"
                                            >
                                                <Icon className="w-5 h-5 flex-shrink-0" />
                                                <span className="flex-1 text-left font-medium text-sm">
                                                    {item.label}
                                                </span>
                                                {getBadgeCount(item.label) > 0 && (
                                                    <span className="mr-2 px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                                                        {getBadgeCount(item.label)}
                                                    </span>
                                                )}
                                                {isExpanded ? (
                                                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                                )}
                                            </button>

                                            {isExpanded && item.subItems && (
                                                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                                                    {item.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem.path}
                                                            href={subItem.path}
                                                            onClick={() => onClose()}
                                                            className={`flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-200 ${isActive(subItem.path)
                                                                ? "bg-primary-green text-white font-semibold"
                                                                : "text-text-secondary hover:bg-very-light-green hover:text-primary-green"
                                                                }`}
                                                        >
                                                            <span>{subItem.label}</span>
                                                            {getSubItemBadgeCount(subItem.label) > 0 && (
                                                                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                                                                    {getSubItemBadgeCount(subItem.label)}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.path || "#"}
                                            onClick={() => onClose()}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                                ? "bg-gradient-primary text-white shadow-green"
                                                : "text-text-secondary hover:bg-very-light-green hover:text-primary-green"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            <span className="flex-1 font-medium text-sm">{item.label}</span>
                                            {getBadgeCount(item.label) > 0 && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                                                    {getBadgeCount(item.label)}
                                                </span>
                                            )}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <p className="text-xs text-text-muted text-center">
                        © 2026 PEBEC BIZLINK
                    </p>
                </div>
            </aside>
        </>
    );
}
