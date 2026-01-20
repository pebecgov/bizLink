"use client";

import { Sparkles, ExternalLink, TrendingUp, Loader2, Check, UserPlus, Clock } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export function AIMatches() {
    const matchedInvestors = useQuery(api.matching.getMatchedInvestors, {});
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const myConnections = useQuery(api.connections.getMyConnections);
    const initiateConnect = useMutation(api.connections.initiateConnection);
    const [connecting, setConnecting] = useState<Record<string, boolean>>({});

    const handleConnect = async (investorId: string, investorName: string) => {
        if (!myBusiness?._id) {
            toast.error("Complete your business profile first");
            return;
        }

        setConnecting(prev => ({ ...prev, [investorId]: true }));
        try {
            await initiateConnect({
                businessId: myBusiness._id,
                investorId
            });
            toast.success(`Connection request sent to ${investorName}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to connect");
        } finally {
            setConnecting(prev => ({ ...prev, [investorId]: false }));
        }
    };

    if (matchedInvestors === undefined) {
        return (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-lg">AI-Matched Investors</span>
                    </div>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-700 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    // If no real investor matches, show placeholder
    if (!matchedInvestors || matchedInvestors.length === 0) {
        return (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-lg">AI-Matched Investors</span>
                    </div>
                </div>
                <div className="text-center py-8 text-gray-400">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Complete your business profile to get matched with investors</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-lg">AI-Matched Investors</span>
                </div>
                <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    View All Matches
                </button>
            </div>

            <div className="space-y-3">
                {matchedInvestors.slice(0, 3).map((match, index) => {
                    const investorId = match.investor.userId;
                    const connection = myConnections?.find(c => c.investorId === investorId);

                    return (
                        <InvestorCard
                            key={investorId || index}
                            investorId={investorId}
                            name={match.investor.registeredName || "Anonymous Investor"}
                            type={match.investor.riskAppetite === "high" ? "Venture Capital" :
                                match.investor.riskAppetite === "medium" ? "Growth Equity" : "Angel Investor"}
                            budget={match.investor.capitalRange || "Undisclosed"}
                            match={match.score}
                            location={match.investor.jurisdiction || "Nigeria"}
                            sectors={match.investor.sectors?.slice(0, 2) || []}
                            status={connection?.status}
                            isConnecting={connecting[investorId || ""]}
                            onConnect={() => investorId && handleConnect(investorId, match.investor.registeredName || "Investor")}
                        />
                    );
                })}
            </div>
        </div>
    );
}

interface InvestorCardProps {
    investorId?: string;
    name: string;
    type: string;
    budget: string;
    match: number;
    location: string;
    sectors: string[];
    status?: string;
    isConnecting?: boolean;
    onConnect?: () => void;
}

function InvestorCard({ name, type, budget, match, location, sectors, status, isConnecting, onConnect }: InvestorCardProps) {
    // Map capital range to display format
    const formatBudget = (range: string) => {
        const budgetMap: Record<string, string> = {
            "1k-10k": "$1K - $10K",
            "10k-50k": "$10K - $50K",
            "50k-200k": "$50K - $200K",
            "200k+": "$200K+",
        };
        return budgetMap[range] || range;
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                            {name}
                        </h4>
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {match}% Match
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{type} • {location}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
                            {formatBudget(budget)}
                        </span>
                        {sectors.slice(0, 1).map((sector, i) => (
                            <span key={i} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                                {sector}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {status === "connected" ? (
                        <div className="p-2 text-green-400 bg-green-400/10 rounded-lg">
                            <Check className="w-4 h-4" />
                        </div>
                    ) : status === "lead" ? (
                        <div className="p-2 text-blue-400 bg-blue-400/10 rounded-lg">
                            <Clock className="w-4 h-4" />
                        </div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onConnect?.();
                            }}
                            disabled={isConnecting}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors group/btn"
                        >
                            {isConnecting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <UserPlus className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            )}
                        </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
