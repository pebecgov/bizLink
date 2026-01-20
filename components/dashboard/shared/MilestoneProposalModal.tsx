"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { X, Calendar, Milestone, AlertCircle, Loader2, FileCheck, Check } from "lucide-react";
import { toast } from "sonner";

interface MilestoneProposalModalProps {
    connectionId: Id<"connections">;
    isOpen: boolean;
    onClose: () => void;
}

export function MilestoneProposalModal({ connectionId, isOpen, onClose }: MilestoneProposalModalProps) {
    const proposeMilestone = useMutation(api.messages.proposeMilestone);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        deadline: "",
        requiresDocument: false,
        documentType: "",
        docScenario: "request" as "request" | "sign",
        templateUrl: "",
    });

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                title: "",
                description: "",
                deadline: "",
                requiresDocument: false,
                documentType: "",
                docScenario: "request",
                templateUrl: "",
            });
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title || !formData.description || !formData.deadline) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.requiresDocument && !formData.documentType) {
            setError("Please specify the document name/type");
            return;
        }

        if (formData.requiresDocument && formData.docScenario === "sign" && !formData.templateUrl) {
            setError("Please provide the template/document URL");
            return;
        }

        // Create date at end of day to allow "today"
        const selectedDate = new Date(formData.deadline);
        selectedDate.setHours(23, 59, 59, 999);

        if (selectedDate.getTime() < Date.now()) {
            setError("Deadline cannot be in the past");
            return;
        }

        setIsSubmitting(true);
        try {
            const deadlineTimestamp = new Date(formData.deadline).getTime();
            await proposeMilestone({
                connectionId,
                title: formData.title,
                description: formData.description,
                deadline: deadlineTimestamp,
                requiresDocument: formData.requiresDocument,
                documentType: formData.requiresDocument ? formData.documentType : undefined,
                templateUrl: (formData.requiresDocument && formData.docScenario === "sign") ? formData.templateUrl : undefined,
            });
            toast.success("Milestone proposal sent!");
            onClose();
        } catch (error) {
            console.error("Failed to propose milestone:", error);
            setError("Failed to send proposal. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-2xl translate-x-8 -translate-y-8" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                            <Milestone className="w-7 h-7 text-indigo-200" />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-bold tracking-tight">Propose Milestone</h2>
                            <p className="text-indigo-200 text-xs font-medium">Define a roadmap step for this connection</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Milestone Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g., Initial Document Review"
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Detail what needs to be achieved in this step..."
                            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target Deadline</label>
                        <div className="relative">
                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                required
                                type="date"
                                className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium transition-all"
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => setFormData({ ...formData, requiresDocument: !formData.requiresDocument })}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <FileCheck className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">Require Document?</span>
                            </div>
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${formData.requiresDocument ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
                                {formData.requiresDocument && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                        </div>

                        {formData.requiresDocument && (
                            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200 pt-3 border-t border-slate-200/60">
                                <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, docScenario: "request" })}
                                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${formData.docScenario === "request" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
                                    >
                                        Case 1: Request
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, docScenario: "sign" })}
                                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${formData.docScenario === "sign" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
                                    >
                                        Case 2: Send & Sign
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Document Name/Type</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g., Signed NDA, CAC Form 1.1"
                                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs font-medium"
                                        value={formData.documentType}
                                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                                    />
                                </div>

                                {formData.docScenario === "sign" && (
                                    <div className="space-y-2 animate-in slide-in-from-top-1 duration-200">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Template URL</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="https://example.com/template.pdf"
                                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs font-medium"
                                            value={formData.templateUrl}
                                            onChange={(e) => setFormData({ ...formData, templateUrl: e.target.value })}
                                        />
                                        <p className="text-[9px] text-slate-400 italic">You provide this file for the other party to sign.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex gap-3 text-blue-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-[10px] leading-relaxed">
                            Once proposed, the other party will be notified. Agreements are recorded as part of the formal engagement roadmap.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2 border border-red-100 animate-in shake">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] px-6 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 text-sm"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Proposal"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
