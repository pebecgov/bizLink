"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { roleConfigs } from "./SidebarConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [selectedRole, setSelectedRole] = useState("SUPER ADMIN");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const pathname = usePathname();

    const currentRoleConfig = roleConfigs.find((config) => config.role === selectedRole);

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
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                            PEBEC BIZLINK
                        </h2>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Role Selector */}
                    <div className="relative">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full px-4 py-3 bg-gradient-primary text-white rounded-xl font-semibold appearance-none cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                        >
                            {roleConfigs.map((config) => (
                                <option key={config.role} value={config.role} className="bg-white text-text-primary">
                                    {config.role}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
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
                                                            className={`block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${isActive(subItem.path)
                                                                ? "bg-primary-green text-white font-semibold"
                                                                : "text-text-secondary hover:bg-very-light-green hover:text-primary-green"
                                                                }`}
                                                        >
                                                            {subItem.label}
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
                                            <span className="font-medium text-sm">{item.label}</span>
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
