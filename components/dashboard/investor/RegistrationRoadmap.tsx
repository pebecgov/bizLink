"use client";

import React from "react";
import { CheckCircle2, Circle, Clock, Info, ShieldCheck } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface RoadmapStep {
    serviceName: string;
    issuingMda: string;
    description: string;
    isRequired: boolean;
    order: number;
    mdaName?: string;
    timeline?: string;
    cost?: string;
    mdaDescription?: string;
    isCompleted?: boolean;
}

export default function RegistrationRoadmap({ sector }: { sector: string }) {
    const requirements = useQuery(api.concierge.getSectorRequirements, {
        sector,
        investorType: "foreign"
    });
    const activeCase = useQuery(api.concierge.getMyConciergeCase, { sector });

    const updateStep = useMutation(api.concierge.updateCaseStep);

    if (!requirements) return <div className="animate-pulse h-64 bg-slate-100 rounded-xl" />;

    const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Registration Roadmap</h2>
                    <p className="text-slate-500">Step-by-step guide for {sector} investors</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-100">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Facilitator Assigned
                </div>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100" />

                <div className="space-y-8">
                    {sortedReqs.map((step, index) => {
                        const caseStep = activeCase?.checklists.find(c => c.requirementKey === step.serviceName);
                        const isCompleted = caseStep?.isCompleted || false;

                        return (
                            <div key={index} className="relative pl-12">
                                {/* Dot */}
                                <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${isCompleted ? "bg-green-500" : "bg-slate-200"
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    ) : (
                                        <div className="w-2 h-2 bg-slate-400 rounded-full" />
                                    )}
                                </div>

                                <div className={`p-5 rounded-xl border transition-all ${isCompleted ? "bg-green-50/50 border-green-100" : "bg-slate-50/30 border-slate-100 hover:border-slate-200"
                                    }`}>
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                    {step.issuingMda}
                                                </span>
                                                {step.isRequired && (
                                                    <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded-md font-bold uppercase">
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900">{step.serviceName}</h3>
                                            <p className="text-sm text-slate-600 mt-1">{step.description}</p>

                                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Timeline: {step.timeline || "NA"}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                                                    <Info className="w-3.5 h-3.5" />
                                                    Cost: {step.cost || "NA"}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => activeCase && updateStep({
                                                caseId: activeCase._id,
                                                serviceName: step.serviceName,
                                                isCompleted: !isCompleted
                                            })}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${isCompleted
                                                ? "bg-white text-green-600 border border-green-200 hover:bg-green-50"
                                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                                                }`}
                                        >
                                            {isCompleted ? "Mark Incomplete" : "Get Started"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
