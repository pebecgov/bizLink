"use client";

import React, { useState, useEffect } from "react";
import RegistrationRoadmap from "@/components/dashboard/investor/RegistrationRoadmap";
import MdaInfoCard from "@/components/dashboard/investor/MdaInfoCard";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Sparkles, MessageSquare, ShieldCheck, HelpCircle, ChevronDown, LayoutDashboard } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function ConciergePage() {
    const investorProfile = useQuery(api.onboarding.getInvestorProfile);
    const sectors = investorProfile?.sectors || [];
    const [selectedSector, setSelectedSector] = useState<string>("");

    // Set initial sector when profile loads
    useEffect(() => {
        if (sectors.length > 0 && !selectedSector) {
            setSelectedSector(sectors[0]);
        }
    }, [sectors, selectedSector]);

    const mdas = useQuery(api.concierge.listMdas, {
        sector: selectedSector || undefined
    });

    const activeCase = useQuery(api.concierge.getMyConciergeCase, {
        sector: selectedSector
    });

    const startCase = useMutation(api.concierge.startConciergeCase);

    // Automatically start a case for the selected sector if none exists
    useEffect(() => {
        if (selectedSector && activeCase === null) {
            startCase({ sector: selectedSector });
        }
    }, [selectedSector, activeCase, startCase]);

    if (!investorProfile) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Global Investor Concierge</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            Seamless Onboarding Roadmap
                        </h1>
                        <p className="text-lg text-slate-500 mt-2 max-w-2xl">
                            Navigate the Nigerian regulatory landscape with ease.
                            Select a sector to view your tailored roadmap.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sector Switcher */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm min-w-[200px] justify-between">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <LayoutDashboard className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                        <span className="truncate">{selectedSector || "Select Sector"}</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[240px] rounded-xl p-2 shadow-xl border-slate-100">
                                {sectors.map((s) => (
                                    <DropdownMenuItem
                                        key={s}
                                        onClick={() => setSelectedSector(s)}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors ${selectedSector === s ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        {s}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                            <MessageSquare className="w-5 h-5" />
                            Talk to a Facilitator
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Roadmap Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {selectedSector ? (
                            <RegistrationRoadmap key={selectedSector} sector={selectedSector} />
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
                                <p className="text-slate-500">Please select a sector from the menu above to view your registration roadmap.</p>
                            </div>
                        )}

                        {/* Premium CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-2">Need a fast-tracked process?</h2>
                                <p className="text-blue-100 mb-6 max-w-lg">
                                    Our dedicated contact persons at CAC, NIPC, and SON can help resolve bottle-necks
                                    in your application within 48 hours.
                                </p>
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">
                                    Activate Premium Concierge
                                </button>
                            </div>
                            <ShieldCheck className="absolute -right-8 -bottom-8 w-64 h-64 text-white/10" />
                        </div>
                    </div>

                    {/* Sidebar: MDA Highlights */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Key Agencies</h2>
                            <span className="text-xs font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded-lg bg-slate-50 truncate max-w-[150px]">
                                {selectedSector}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {mdas ? (mdas.length > 0 ? mdas.slice(0, 4).map((mda) => (
                                <MdaInfoCard key={`${mda._id}-${selectedSector}`} mda={mda} />
                            )) : (
                                <div className="text-center py-8 text-slate-400 text-sm italic">
                                    No specific agencies highlighted for this sector yet.
                                </div>
                            )) : (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse bg-slate-100 h-64 rounded-2xl" />
                                ))
                            )}
                        </div>

                        {/* Facilitator Card */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-8">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Your Case Manager</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                                    JB
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">John Boateng</p>
                                    <p className="text-xs text-slate-500">PEBEC Fast-Track Division</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                "I'll be your primary point of contact for any inter-agency escalations.
                                We aim to resolve all pending documents within the stated SLAs."
                            </p>
                            <button className="w-full bg-white border border-slate-200 text-slate-900 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
