import { Rocket, Check, Sparkles, ExternalLink, Image as ImageIcon, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpgradeCard() {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-6">
                            <Sparkles className="w-3 h-3" />
                            Premium Opportunity
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Expand Your Global Reach
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Upgrade to <span className="text-white font-bold italic">BizLink Premium</span> and unlock powerful tools designed to help Nigerian businesses connect with international partners.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: MessageSquare, title: "Rich Description", desc: "Detailed business story" },
                                { icon: ExternalLink, title: "Social Connect", desc: "Linked media accounts" },
                                { icon: ImageIcon, title: "Media Gallery", desc: "Images and video support" },
                                { icon: Briefcase, title: "Market Growth", desc: "Verification priority" }
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
                                        <feature.icon className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white leading-none mb-1">{feature.title}</p>
                                        <p className="text-[10px] text-slate-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-72 shrink-0">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-inner">
                            <div className="text-center mb-6">
                                <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-widest">Pricing starts from</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-sm font-bold text-slate-400">₦</span>
                                    <span className="text-4xl font-black text-white tracking-tighter">15,000</span>
                                    <span className="text-sm text-slate-400">/mo</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 group"
                                onClick={() => window.open('/dashboard/settings/plan', '_self')}
                            >
                                <Rocket className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Upgrade Now
                            </Button>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                    <Check className="w-3 h-3 text-amber-500" />
                                    <span>Instant setup & activation</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                    <Check className="w-3 h-3 text-amber-500" />
                                    <span>24/7 dedicated support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
