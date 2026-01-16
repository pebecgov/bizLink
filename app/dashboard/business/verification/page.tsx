"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Clock, ChevronRight, ShieldCheck, Building2, FileText, Ban } from "lucide-react";

// Static mock data for verification page (to be replaced with backend data later)
const verificationData = {
    verificationLevel: "Intermediate",
    credibilityScore: 720,
    verificationBadges: [
        { label: "CAC Verified", icon: Building2, status: "Verified" },
        { label: "TIN Verified", icon: FileText, status: "Verified" },
        { label: "Bank Verified", icon: CheckCircle, status: "Pending" },
        { label: "Address Verified", icon: CheckCircle, status: "Not Started" },
        { label: "Tax Clearance", icon: FileText, status: "Not Started" },
    ],
    pendingVerifications: [
        {
            name: "Financial Documentation",
            req: "Upload 2 years of financial statements",
            status: "Pending Upload",
            eta: "3-5 business days after submission",
            progress: 50,
        },
        {
            name: "Address Verification",
            req: "Utility bill or lease agreement",
            status: "Not Started",
            eta: "2-3 business days",
            progress: 0,
        },
        {
            name: "Tax Clearance Certificate",
            req: "Current tax clearance from FIRS",
            status: "Not Started",
            eta: "5-7 business days",
            progress: 0,
        },
    ],
};

export default function VerificationPage() {
    const { verificationBadges, pendingVerifications, verificationLevel, credibilityScore } = verificationData;

    return (
        <div className="max-w-6xl mx-auto pb-12 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Verification Status</h1>
                    <p className="text-text-secondary">Track your business verification level and trust score</p>
                </div>
                <Button className="bg-primary-green hover:bg-green-700 text-white">
                    Connect More Verifications
                </Button>
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
                            <h3 className="text-4xl font-bold text-primary-green mb-2 uppercase">{verificationLevel}</h3>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-500 text-xl">⭐</span>
                                <span className="font-semibold text-text-primary">Overall Score: {credibilityScore / 10}/100</span>
                            </div>
                        </div>

                        {/* Progress Bar (Visual Only) */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                                <span>Basic</span>
                                <span>Intermediate</span>
                                <span>Advanced</span>
                                <span>Premium</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full w-[72%] bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"></div>
                                {/* Markers */}
                                <div className="absolute top-0 left-[25%] h-full w-0.5 bg-white"></div>
                                <div className="absolute top-0 left-[50%] h-full w-0.5 bg-white"></div>
                                <div className="absolute top-0 left-[75%] h-full w-0.5 bg-white"></div>
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-500">You are 72% of the way to Advanced Level</p>
                        </div>
                    </div>

                    {/* Levels Table */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                            {/* Basic */}
                            <div className="p-4 flex flex-col items-center text-center opacity-60">
                                <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
                                    <CheckCircle className="w-4 h-4" /> BASIC
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Marketplace Access</li>
                                    <li>• Create Profile</li>
                                </ul>
                            </div>
                            {/* Intermediate */}
                            <div className="p-4 flex flex-col items-center text-center bg-white border-b-4 border-primary-green">
                                <div className="flex items-center gap-2 mb-2 text-primary-green font-bold">
                                    <CheckCircle className="w-4 h-4" /> INTERMEDIATE
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Send Proposals</li>
                                    <li>• Receive RFQs</li>
                                    <li>• Basic Analytics</li>
                                </ul>
                            </div>
                            {/* Advanced */}
                            <div className="p-4 flex flex-col items-center text-center">
                                <div className="flex items-center gap-2 mb-2 text-gray-400 font-bold">
                                    <XCircle className="w-4 h-4" /> ADVANCED
                                </div>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Priority Listings</li>
                                    <li>• Advanced Analytics</li>
                                </ul>
                            </div>
                            {/* Premium */}
                            <div className="p-4 flex flex-col items-center text-center">
                                <div className="flex items-center gap-2 mb-2 text-gray-400 font-bold">
                                    <XCircle className="w-4 h-4" /> PREMIUM
                                </div>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Premium Badge</li>
                                    <li>• Featured Listings</li>
                                </ul>
                            </div>
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
                    {verificationBadges.map((badge, idx) => {
                        const Icon = badge.icon;
                        return (
                            <div key={idx} className={`rounded-xl border p-4 flex flex-col items-center justify-center text-center gap-3 transition-all hover:shadow-md ${badge.status === "Verified" ? "bg-green-50 border-green-200" :
                                badge.status === "Pending" ? "bg-yellow-50 border-yellow-200" :
                                    "bg-gray-50 border-gray-200 grayscale opacity-70"
                                }`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.status === "Verified" ? "bg-white text-green-600 shadow-sm" :
                                    badge.status === "Pending" ? "bg-white text-yellow-600 shadow-sm" :
                                        "bg-white text-gray-400"
                                    }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-800">{badge.label}</p>
                                    <p className={`text-xs font-medium mt-1 ${badge.status === "Verified" ? "text-green-600" :
                                        badge.status === "Pending" ? "text-yellow-600" :
                                            "text-gray-500"
                                        }`}>{badge.status}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pending Verifications */}
            <div>
                <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    COMPLETE YOUR VERIFICATION
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">{pendingVerifications.length} Pending</span>
                </h2>

                <div className="space-y-4">
                    {pendingVerifications.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                            {/* Progress bar background for the card header could be cool, but sticking to simple for now */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-text-primary text-lg">{item.name}</h3>
                                        <span className="text-xs font-bold text-gray-400">({item.progress}%)</span>
                                    </div>
                                    <div className="space-y-1 text-sm text-text-secondary">
                                        <p><span className="font-medium text-gray-700">Requirement:</span> {item.req}</p>
                                        <p><span className="font-medium text-gray-700">Status:</span> <span className="text-yellow-600 font-medium">{item.status}</span></p>
                                        <p><span className="font-medium text-gray-700">Estimated:</span> {item.eta}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 min-w-[200px]">
                                    {item.status === "Not Started" ? (
                                        <Button className="bg-primary-green hover:bg-green-700 text-white w-full">
                                            Start Verification
                                        </Button>
                                    ) : item.status === "Pending Upload" ? (
                                        <Button className="bg-primary-green hover:bg-green-700 text-white w-full">
                                            Upload Document
                                        </Button>
                                    ) : (
                                        <Button variant="outline" className="w-full">
                                            View Submitted
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="text-gray-500 text-xs h-8">
                                        Learn More
                                    </Button>
                                </div>
                            </div>

                            {/* Simple Progress Bar Overlay at Bottom */}
                            <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                                <div className="h-full bg-primary-green" style={{ width: `${item.progress}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Third-Party & History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Third Party */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-bold text-text-primary mb-4 border-b pb-2">THIRD-PARTY VERIFICATIONS</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium">CAC Registration</span>
                            </div>
                            <span className="text-xs text-gray-500">Jan 15, 2024</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium">FIRS TIN Verification</span>
                            </div>
                            <span className="text-xs text-gray-500">Dec 1, 2024</span>
                        </li>
                        <li className="flex items-center justify-between opacity-70">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm font-medium">Credit Bureau Check</span>
                            </div>
                            <span className="text-xs text-yellow-600 font-medium">In Progress</span>
                        </li>
                    </ul>
                </div>

                {/* History */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-bold text-text-primary mb-4 border-b pb-2">VERIFICATION HISTORY</h2>
                    <ul className="space-y-4 relative pl-4 border-l border-gray-100 ml-2">
                        <li className="relative pb-4">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                            <p className="text-xs text-gray-400 mb-0.5">Jan 15, 2026</p>
                            <p className="text-sm text-text-secondary">Financial documents submitted for review</p>
                        </li>
                        <li className="relative pb-4">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-green"></div>
                            <p className="text-xs text-gray-400 mb-0.5">Nov 15, 2025</p>
                            <p className="text-sm text-text-secondary">Basic verification level achieved</p>
                        </li>
                    </ul>
                    <Button variant="link" className="text-primary-green text-xs p-0 h-auto">View Full History</Button>
                </div>
            </div>

        </div>
    );
}
