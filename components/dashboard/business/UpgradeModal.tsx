"use client";

import { X, Check, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

// Helper for conditional classes
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
    const [isYearly, setIsYearly] = useState(true);

    const features = [
        {
            name: "Business Profile Listing",
            basic: true,
            premium: true,
            info: "Get listed in our business directory"
        },
        {
            name: "Basic Contact Information",
            basic: true,
            premium: true,
            info: "Display email and phone number"
        },
        {
            name: "Rich Business Description",
            basic: false,
            premium: true,
            info: "Detailed business story with formatting"
        },
        {
            name: "Social Media Integration",
            basic: false,
            premium: true,
            info: "Link all your social media accounts"
        },
        {
            name: "Media Gallery",
            basic: false,
            premium: true,
            info: "Upload images and videos"
        },
        {
            name: "Featured Placement",
            basic: false,
            premium: true,
            info: "Appear at the top of search results"
        },
        {
            name: "Support Level",
            basic: "Standard",
            premium: "Priority",
            info: "Get help when you need it"
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white rounded-[2rem] border-none shadow-2xl">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-50 group"
                >
                    <X className="w-4 h-4 text-slate-500 group-hover:text-slate-700 font-bold" />
                </button>

                {/* Header */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 text-[10px] font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3 h-3" />
                        Premium Benefits
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Expand Your Global Reach</h2>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                        Compare features and choose the plan that's right for your business.
                        Connect with international partners today.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <span className={cn("text-sm font-bold transition-colors", !isYearly ? "text-slate-900" : "text-slate-400")}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-12 h-6 rounded-full bg-slate-100 p-1 relative transition-all duration-300"
                        >
                            <div className={cn(
                                "w-4 h-4 rounded-full bg-green-600 transition-all duration-300 shadow-sm",
                                isYearly ? "translate-x-6" : "translate-x-0"
                            )} />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className={cn("text-sm font-bold transition-colors", isYearly ? "text-slate-900" : "text-slate-400")}>Yearly</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black rounded-full">SAVE ₦XK</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="px-6 pb-6">
                    <div className="bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[45%]">Features</th>
                                    <th className="text-center px-4 py-5 w-[27.5%]">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-400 uppercase tracking-wider mb-1">Basic</span>
                                            <span className="text-xl font-black text-slate-900">₦X</span>
                                        </div>
                                    </th>
                                    <th className="relative text-center px-4 py-5 w-[27.5%] bg-green-500/5">
                                        <div className="absolute inset-x-0 top-0 h-full border-x border-green-500/20 pointer-events-none" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-green-600 uppercase tracking-wider mb-1">Premium</span>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-black text-slate-900">
                                                    ₦{isYearly ? "XX,XXX" : "X,XXX"}
                                                    <span className="text-[10px] text-slate-400 font-bold ml-0.5 uppercase">
                                                        /{isYearly ? "yr" : "mo"}
                                                    </span>
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-tighter">excl. taxes</span>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {features.map((feature, index) => (
                                    <tr key={index} className={cn(index % 2 === 0 ? "bg-white/50" : "bg-slate-50/30")}>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-700 leading-tight">{feature.name}</span>

                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-center">
                                            {typeof feature.basic === 'boolean' ? (
                                                feature.basic ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-slate-200 mx-auto" />
                                            ) : (
                                                <span className="text-xs font-bold text-slate-500">{feature.basic}</span>
                                            )}
                                        </td>
                                        <td className="relative px-4 py-3.5 text-center bg-green-500/5">
                                            <div className="absolute inset-x-0 top-0 h-full border-x border-green-500/20 pointer-events-none" />
                                            {typeof feature.premium === 'boolean' ? (
                                                feature.premium ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <X className="w-4 h-4 text-slate-200 mx-auto" />
                                            ) : (
                                                <span className="text-xs font-black text-green-600">{feature.premium}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 pb-10 flex flex-col items-center gap-4">
                    <Button
                        onClick={() => window.open('/dashboard/settings/plan', '_self')}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black h-12 rounded-2xl shadow-xl shadow-green-500/20 active:scale-95 transition-all"
                    >
                        Get Premium Access
                    </Button>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
