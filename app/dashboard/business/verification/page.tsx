"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Clock, ChevronRight, ShieldCheck, Building2, FileText, Ban, Star } from "lucide-react";
import Link from "next/link";

export default function VerificationPage() {
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const verificationScore = useQuery(
        api.verificationScore.calculateVerificationScore,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );
    const tierInfo = useQuery(
        api.verificationScore.getVerificationTier,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );
    const verificationDocs = useQuery(
        api.verificationScore.getVerificationDocuments,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );

    if (!myBusiness || !verificationScore || !tierInfo || !verificationDocs) {
        return (
            <div className="max-w-6xl mx-auto pb-12 space-y-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    const { totalPercentage, tier, missingCoreDocuments, missingSectorDocuments } = verificationScore;
    const verifiedBadges = [
        { label: "CAC Verified", icon: Building2, verified: verificationDocs.some(d => d.documentType === "CAC_CERTIFICATE" && d.status === "verified") },
        { label: "TIN Verified", icon: FileText, verified: verificationDocs.some(d => d.documentType === "TIN_CERTIFICATE" && d.status === "verified") },
        { label: "Tax Clearance", icon: FileText, verified: verificationDocs.some(d => d.documentType === "TAX_CLEARANCE" && d.status === "verified") },
        { label: "Business Plan", icon: FileText, verified: verificationDocs.some(d => d.documentType === "BUSINESS_PLAN" && d.status === "verified") },
        { label: "Financial Statements", icon: FileText, verified: verificationDocs.some(d => d.documentType === "FINANCIAL_STATEMENTS" && d.status === "verified") },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-12 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Verification Status</h1>
                    <p className="text-text-secondary">Track your business verification level and trust score</p>
                </div>
                <Link href="/dashboard/business/documents">
                    <Button className="bg-primary-green hover:bg-green-700 text-white">
                        Upload More Documents
                    </Button>
                </Link>
            </div>

            {/* Current Level Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck className="w-64 h-64 text-primary-green" />
                </div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">YOUR VERIFICATION LEVEL</h2>
                            <h3 className="text-4xl font-bold text-primary-green mb-2 uppercase">{tier}</h3>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-500 text-xl">⭐</span>
                                <span className="font-semibold text-text-primary">Overall Score: {totalPercentage}/100</span>
                            </div>
                        </div>

                        {/* Progress Bar (Visual Only) */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                                <span>0%</span>
                                <span>50%</span>
                                <span>70%</span>
                                <span className="text-green-600">75%</span>
                                <span>85%</span>
                                <span>95%</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                                <div
                                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${totalPercentage >= 95 ? "bg-gradient-to-r from-purple-500 to-purple-600" :
                                        totalPercentage >= 85 ? "bg-gradient-to-r from-blue-500 to-blue-600" :
                                            totalPercentage >= 75 ? "bg-gradient-to-r from-green-500 to-green-600" :
                                                totalPercentage >= 70 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" :
                                                    "bg-gradient-to-r from-gray-400 to-gray-500"
                                        }`}
                                    style={{ width: `${totalPercentage}%` }}
                                ></div>
                                {/* Markers */}
                                <div className="absolute top-0 left-[50%] h-full w-0.5 bg-white"></div>
                                <div className="absolute top-0 left-[70%] h-full w-0.5 bg-white"></div>
                                <div className="absolute top-0 left-[75%] h-full w-0.5 bg-green-300"></div>
                                <div className="absolute top-0 left-[85%] h-full w-0.5 bg-white"></div>
                                <div className="absolute top-0 left-[95%] h-full w-0.5 bg-white"></div>
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-500">
                                {tierInfo.nextTier ? `${tierInfo.percentageToNextTier}% away from ${tierInfo.nextTier}` : "Maximum tier achieved!"}
                            </p>
                        </div>
                    </div>

                    {/* Levels Table */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            {/* Tier thresholds */}
                            {[
                                { name: "BASIC", threshold: 0, benefits: ["Create profile", "Basic directory listing"] },
                                { name: "VERIFIED", threshold: 50, benefits: ["Full visibility", "Public trust badge"] },
                                { name: "PARTNERSHIP READY", threshold: 75, benefits: ["Receive messages", "Explore partnerships"] },
                                { name: "HIGHLY VERIFIED", threshold: 85, benefits: ["Featured listing", "Advanced analytics"] },
                                { name: "PREMIUM", threshold: 95, benefits: ["Top rankings", "Continental reach"] },
                            ].map((t, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 flex flex-col items-center text-center ${totalPercentage >= t.threshold && totalPercentage < (idx < 4 ? [50, 75, 85, 95][idx] : 100)
                                        ? "bg-white border-b-4 border-primary-green"
                                        : totalPercentage >= t.threshold ? "opacity-60" : ""
                                        }`}
                                >
                                    <div className={`flex items-center gap-2 mb-2 font-bold text-xs ${totalPercentage >= t.threshold ? "text-primary-green" : "text-gray-400"
                                        }`}>
                                        {totalPercentage >= t.threshold ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <XCircle className="w-4 h-4" />
                                        )}
                                        {t.name}
                                    </div>
                                    <ul className="text-[10px] text-gray-600 space-y-1">
                                        {t.benefits.slice(0, 2).map((b, i) => (
                                            <li key={i}>• {b}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges Earned */}
            <div>
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    VERIFICATION BADGES EARNED
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {verifiedBadges.map((badge, idx) => {
                        const Icon = badge.icon;
                        const status = badge.verified ? "Verified" : "Not Started";
                        return (
                            <div key={idx} className={`rounded-xl border p-4 flex flex-col items-center justify-center text-center gap-3 transition-all hover:shadow-md ${status === "Verified" ? "bg-green-50 border-green-200" :
                                "bg-gray-50 border-gray-200 grayscale opacity-70"
                                }`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${status === "Verified" ? "bg-white text-green-600 shadow-sm" :
                                    "bg-white text-gray-400"
                                    }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-800">{badge.label}</p>
                                    <p className={`text-xs font-medium mt-1 ${status === "Verified" ? "text-green-600" : "text-gray-500"
                                        }`}>{status}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Complete Your Verification */}
            {(missingCoreDocuments.length > 0 || missingSectorDocuments.length > 0) && (
                <div>
                    <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                        COMPLETE YOUR VERIFICATION
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                            {missingCoreDocuments.length + missingSectorDocuments.length} Pending
                        </span>
                    </h2>

                    <div className="space-y-4">
                        {missingCoreDocuments.slice(0, 3).map((docName, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-text-primary text-lg">{docName}</h3>
                                            <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                                                Required
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm text-text-secondary">
                                            <p><span className="font-medium text-gray-700">Status:</span> <span className="text-yellow-600 font-medium">Not Uploaded</span></p>
                                            <p><span className="font-medium text-gray-700">Category:</span> Core Document</p>
                                        </div>
                                    </div>

                                    <Link href="/dashboard/business/documents">
                                        <Button className="bg-primary-green hover:bg-green-700 text-white">
                                            Upload Document
                                        </Button>
                                    </Link>
                                </div>

                                {/* Progress bar */}
                                <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                                    <div className="h-full bg-yellow-400" style={{ width: "0%" }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Current Benefits */}
            <div className="bg-gradient-to-r from-primary-green to-green-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">Current Benefits ({tier})</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tierInfo.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            <span className="text-sm">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
