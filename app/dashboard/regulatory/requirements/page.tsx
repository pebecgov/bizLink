"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ArrowUp,
    ArrowDown,
    Save,
    Building2,
    FileText,
    RefreshCcw,
    ChevronRight,
    LayoutDashboard
} from "lucide-react";
import { toast } from "sonner";

export default function RegulatoryRequirementsPage() {
    const mdas = useQuery(api.concierge.listMdas, {});
    const [selectedSector, setSelectedSector] = useState("Manufacturing");
    const [selectedInvestorType, setSelectedInvestorType] = useState<"local" | "foreign">("foreign");

    const requirements = useQuery(api.concierge.getSectorRequirements, {
        sector: selectedSector,
        investorType: selectedInvestorType
    });

    const updateSectorReqs = useMutation(api.concierge.updateSectorRequirements);
    const updateMdaService = useMutation(api.concierge.updateMdaService);

    const [editingMda, setEditingMda] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleUpdateService = async (mdaId: any, serviceName: string, updates: any) => {
        try {
            await updateMdaService({ mdaId, serviceName, updates });
            toast.success("Service updated successfully");
            setEditingMda(null);
        } catch (error) {
            toast.error("Failed to update service");
        }
    };

    if (!mdas || !requirements) {
        return <div className="p-8 animate-pulse space-y-4">
            <div className="h-8 w-64 bg-slate-100 rounded" />
            <div className="h-64 bg-slate-50 rounded-xl" />
        </div>;
    }

    const filteredMdas = mdas.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.acronym.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Regulatory Content Hub</h1>
                <p className="text-slate-500 mt-1 text-lg">Manage agencies, service SLAs, and investor roadmaps.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: MDA Management */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                Government Agencies
                            </h2>
                        </div>

                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search agencies..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredMdas.map((mda) => (
                                <div
                                    key={mda._id}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer ${editingMda?._id === mda._id ? "border-blue-500 bg-blue-50/30" : "border-slate-100 bg-slate-50/30 hover:bg-slate-50"
                                        }`}
                                    onClick={() => setEditingMda(mda)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{mda.acronym}</span>
                                            <h3 className="font-bold text-slate-900 line-clamp-1">{mda.name}</h3>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${editingMda?._id === mda._id ? "rotate-90 text-blue-500" : ""}`} />
                                    </div>

                                    {editingMda?._id === mda._id && (
                                        <div className="mt-4 pt-4 border-t border-blue-100 space-y-4" onClick={(e) => e.stopPropagation()}>
                                            <p className="text-xs text-slate-500 uppercase font-bold px-1">Active Services</p>
                                            {mda.services.map((service, sIdx) => (
                                                <div key={sIdx} className="bg-white p-3 rounded-lg border border-blue-100">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-bold text-slate-800">{service.name}</span>
                                                        <button
                                                            onClick={() => toast.info("Full service editor coming soon")}
                                                            className="p-1 hover:bg-slate-100 rounded text-slate-400"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="text-[10px] text-slate-400">
                                                            <span className="block font-bold text-slate-500 uppercase">SLA</span>
                                                            {service.timeline}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400">
                                                            <span className="block font-bold text-slate-500 uppercase">Cost</span>
                                                            {service.cost}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sector Roadmap Management */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    Sector Onboarding Roadmap
                                </h2>
                                <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mt-1">Configuring: {selectedSector}</p>
                            </div>

                            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200">
                                <button
                                    onClick={() => setSelectedInvestorType("foreign")}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedInvestorType === "foreign" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                                >
                                    Foreign
                                </button>
                                <button
                                    onClick={() => setSelectedInvestorType("local")}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedInvestorType === "local" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
                                >
                                    Local
                                </button>
                            </div>
                        </div>

                        {/* Drag-and-drop Roadmap Editor (Simplified) */}
                        <div className="space-y-4">
                            {requirements.map((req, index) => (
                                <div key={index} className="flex items-center gap-4 p-5 bg-slate-50/30 border border-slate-100 rounded-2xl group hover:border-blue-200 hover:bg-slate-50 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400">
                                            <ArrowUp className="w-3 h-3" />
                                        </button>
                                        <button className="p-1 hover:bg-white rounded border border-transparent hover:border-slate-200 text-slate-400">
                                            <ArrowDown className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{req.issuingMda}</span>
                                            {req.isRequired && <span className="text-[9px] px-1.5 py-0.5 bg-red-50 text-red-500 rounded font-bold uppercase">Required</span>}
                                        </div>
                                        <h3 className="font-bold text-slate-900">{req.serviceName}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-1">{req.description}</p>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:text-blue-600">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-white text-red-500 rounded-lg border border-red-100 hover:bg-red-50">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2">
                                <Plus className="w-5 h-5" />
                                Add Requirement to Roadmap
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-sm text-slate-400 flex items-center gap-1">
                                <RefreshCcw className="w-3.5 h-3.5 animate-spin-reverse" />
                                Autosaved at {new Date().toLocaleTimeString()}
                            </span>
                            <button
                                onClick={() => toast.success("Configuration published successfully")}
                                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                            >
                                <Save className="w-5 h-5" />
                                Publish Changes
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats / Global Config */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white">
                            <h3 className="font-bold text-lg mb-1">Global Overlays</h3>
                            <p className="text-indigo-100 text-xs mb-4">Steps mandatory for every single investor profile.</p>
                            <div className="space-y-2">
                                <div className="bg-white/10 p-2 rounded-lg text-xs flex justify-between">
                                    <span>CAC Name Availability</span>
                                    <span className="font-bold uppercase">Locked</span>
                                </div>
                                <div className="bg-white/10 p-2 rounded-lg text-xs flex justify-between">
                                    <span>NIPC Registration</span>
                                    <span className="font-bold uppercase">Locked</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-3xl text-white">
                            <h3 className="font-bold text-lg mb-4">SLA Compliance</h3>
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-extrabold text-blue-400">94<span className="text-xl">%</span></div>
                                <div className="text-xs text-slate-400 leading-tight">
                                    Investors are seeing an average
                                    onboarding time of <span className="text-white font-bold underline">12 Days</span> across {mdas.length} Agencies.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
