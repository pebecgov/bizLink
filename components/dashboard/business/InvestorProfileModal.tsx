"use client";

import { X, Shield, MapPin, Briefcase, TrendingUp, Globe, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface InvestorProfileModalProps {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
}

export function InvestorProfileModal({ userId, isOpen, onClose }: InvestorProfileModalProps) {
    const profile = useQuery(api.onboarding.getInvestorProfileByClerkId, { userId });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Investor Profile</h2>
                            <p className="text-blue-100 text-sm">Review investor background and criteria</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {profile === undefined ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                            <p className="text-gray-500">Loading profile details...</p>
                        </div>
                    ) : profile === null ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Profile information not found.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Primary Info */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Entity Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">Registered Name</p>
                                        <p className="font-semibold text-gray-900">{profile.registeredName}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">Jurisdiction</p>
                                        <div className="flex items-center gap-1">
                                            <Globe className="w-3 h-3 text-gray-400" />
                                            <p className="font-semibold text-gray-900">{profile.jurisdiction}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Investment Preferences */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Investment Criteria</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                                            <Briefcase className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Sectors of Interest</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {profile.sectors.map((sector: string) => (
                                                    <span key={sector} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full">
                                                        {sector}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-50 rounded-lg shrink-0">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Capital Range</p>
                                                <p className="text-sm font-semibold text-gray-900">{profile.capitalRange}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 rounded-lg shrink-0">
                                                <Shield className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Risk Appetite</p>
                                                <p className="text-sm font-semibold capitalize text-gray-900">{profile.riskAppetite}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-blue-600">
                                <Shield className="w-4 h-4" />
                                <p className="text-[10px] font-medium italic">Verified PEBEC Investor Profile</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
