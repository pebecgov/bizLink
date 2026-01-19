"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Upload, TrendingUp, Lock, Star } from "lucide-react";

interface VerificationProgressBannerProps {
    percentage: number;
    tier: string;
    canReceiveInvestment: boolean;
    missingCoreDocuments: string[];
    missingSectorDocuments: string[];
}

export function VerificationProgressBanner({
    percentage,
    tier,
    canReceiveInvestment,
    missingCoreDocuments,
    missingSectorDocuments,
}: VerificationProgressBannerProps) {
    const getTierColor = () => {
        if (percentage >= 95) return "from-purple-500 to-purple-700";
        if (percentage >= 85) return "from-blue-500 to-blue-700";
        if (percentage >= 75) return "from-green-500 to-green-700";
        if (percentage >= 70) return "from-yellow-500 to-yellow-700";
        return "from-gray-100 to-gray-200";
    };

    const getTierIcon = () => {
        if (percentage >= 75) return <CheckCircle className="w-6 h-6" />;
        if (percentage >= 50) return <TrendingUp className="w-6 h-6" />;
        return <AlertTriangle className="w-6 h-6" />;
    };

    const getTextColor = () => {
        // Use white text for darker backgrounds (70%+), gray text for light background (<70%)
        return percentage >= 70 ? "text-white" : "text-gray-700";
    };

    const getProgressBarColor = () => {
        if (percentage >= 95) return "bg-gradient-to-r from-purple-500 to-purple-600";
        if (percentage >= 85) return "bg-gradient-to-r from-blue-500 to-blue-600";
        if (percentage >= 75) return "bg-gradient-to-r from-green-500 to-green-600";
        if (percentage >= 70) return "bg-gradient-to-r from-yellow-500 to-yellow-600";
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    };

    const totalMissing = missingCoreDocuments.length + missingSectorDocuments.length;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-r ${getTierColor()} ${getTextColor()} p-6`}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            {getTierIcon()}
                        </div>
                        <div>
                            <h3 className="text-sm font-medium opacity-90">Verification Status</h3>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-2xl font-bold">{tier}</p>
                                <span className="text-3xl font-bold">{percentage}%</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/dashboard/business/documents">
                        <Button className="bg-green-500 text-white hover:bg-gray-100">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Documents
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Progress Bar with Tier Markers */}
            <div className="px-6 pt-4 pb-2">
                <div className="relative">
                    {/* Tier Labels */}
                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                        <span>0%</span>
                        <span>50%</span>
                        <span>70%</span>
                        <span className="text-green-600">75%</span>
                        <span>85%</span>
                        <span>95%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
                        <div
                            className={`h-full ${getProgressBarColor()} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                        {/* Tier Markers */}
                        <div className="absolute top-0 left-[50%] h-full w-0.5 bg-white"></div>
                        <div className="absolute top-0 left-[70%] h-full w-0.5 bg-white"></div>
                        <div className="absolute top-0 left-[75%] h-full w-0.5 bg-green-300"></div>
                        <div className="absolute top-0 left-[85%] h-full w-0.5 bg-white"></div>
                        <div className="absolute top-0 left-[95%] h-full w-0.5 bg-white"></div>
                    </div>

                    {/* Tier Names */}
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                        <span>Basic</span>
                        <span>Viewing</span>
                        <span className="text-green-600 font-bold">Investment Ready</span>
                        <span>Premium</span>
                    </div>
                </div>
            </div>

            {/* Status Message */}
            <div className="px-6 pb-6">
                {canReceiveInvestment ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-green-900 text-sm">Investment Features Unlocked! 🎉</h4>
                            <p className="text-sm text-green-700 mt-1">
                                You can now receive investment offers from investors. Keep uploading documents to increase your credibility.
                            </p>
                        </div>
                    </div>
                ) : percentage >= 70 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-yellow-900 text-sm">
                                Almost There! Just {75 - percentage}% more to unlock investments
                            </h4>
                            <p className="text-sm text-yellow-700 mt-1">
                                You're very close to becoming investment-ready. Upload {totalMissing} more document{totalMissing !== 1 ? 's' : ''} to reach 75%.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                        <Lock className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-green-900 text-sm">
                                Complete Verification to Unlock Investment Features
                            </h4>
                            <p className="text-sm text-green-700 mt-1">
                                Upload required documents to reach <strong>75% verification</strong> and start receiving investment offers.
                            </p>
                            {totalMissing > 0 && (
                                <div className="mt-3">
                                    <p className="text-sm font-medium text-green-800 mb-1">Missing Documents:</p>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        {missingCoreDocuments.slice(0, 3).map((doc, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                {doc}
                                            </li>
                                        ))}
                                        {missingCoreDocuments.length > 3 && (
                                            <li className="text-xs italic">
                                                + {missingCoreDocuments.length - 3} more documents
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
