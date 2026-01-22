"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowUp, Info, HelpCircle, Download } from "lucide-react";

// Static mock data (to be replaced with backend data later)
const scoreData = {
    credibilityScore: 78,
    scoreBreakdown: {
        verification: { label: "Verification", score: 92, max: 100 },
        financial: { label: "Financial Health", score: 78, max: 100 },
        operational: { label: "Operational Performance", score: 65, max: 100 },
        compliance: { label: "Compliance & Governance", score: 88, max: 100 },
        reputation: { label: "Market Reputation", score: 75, max: 100 },
    },
    scoreHistory: [
        { month: "Oct", score: 73 },
        { month: "Nov", score: 75 },
        { month: "Dec", score: 77 },
        { month: "Jan", score: 78 },
    ],
};

export default function CredibilityScorePage() {
    const { credibilityScore, scoreBreakdown, scoreHistory } = scoreData;

    // Helper to calculate percentage width
    const getWidth = (score: number, max: number) => `${(score / max) * 100}%`;

    return (
        <div className="max-w-6xl mx-auto pb-12 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Credibility Score</h1>
                    <p className="text-text-secondary">Understand how investors and partners view your business</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Download Report
                </Button>
            </div>

            {/* Main Score Card */}
            <div className="bg-gradient-to-br from-primary-green to-teal-800 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" fill="none" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wide">
                            <TrendingUp className="w-3 h-3" />
                            UPDATED TODAY
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            {credibilityScore}
                            <span className="text-2xl text-white/60 ml-2 font-normal">/ 100</span>
                        </h2>
                        <div>
                            <p className="text-2xl font-semibold mb-1">Very Good</p>
                            <p className="text-white/80">Top 25% of businesses in your sector.</p>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-medium">Score Trend</span>
                            <div className="flex items-center gap-1 text-green-300 bg-green-900/40 px-2 py-1 rounded text-sm font-bold">
                                <ArrowUp className="w-3 h-3" /> +15 points
                            </div>
                        </div>
                        {/* Simple Bar Chart Visualization */}
                        <div className="h-32 flex items-end justify-between gap-2">
                            {scoreHistory.map((item, idx) => {
                                const height = (item.score / 100) * 100;
                                const isLatest = idx === scoreHistory.length - 1;
                                return (
                                    <div key={idx} className="flex flex-col items-center gap-2 w-full">
                                        <div
                                            className={`w-full rounded-t-sm transition-all duration-500 ${isLatest ? 'bg-white opacity-100' : 'bg-white/40'}`}
                                            style={{ height: `${height}%` }}
                                        ></div>
                                        <span className="text-[10px] uppercase opacity-70">{item.month}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-8">
                    {/* Categories */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                            SCORE BREAKDOWN
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                        </h3>

                        <div className="space-y-6">
                            {Object.entries(scoreBreakdown).map(([key, data]) => (
                                <div key={key}>
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <h4 className="font-semibold text-text-primary">{data.label}</h4>
                                            <p className="text-xs text-text-secondary">Impact: High</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold text-text-primary text-lg">{data.score}%</span>
                                            <span className="text-xs text-gray-400 ml-1">({data.score}/{data.max})</span>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${data.score >= 80 ? 'bg-green-500' :
                                                data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${data.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-text-primary mb-6">INDUSTRY COMPARISON</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 text-sm font-bold text-right text-text-secondary">You</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-r-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-primary-green flex items-center px-3 text-white font-bold text-xs" style={{ width: '78%' }}>
                                        78
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 opacity-70">
                                <div className="w-12 text-sm font-bold text-right text-text-secondary">Avg</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-r-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-gray-400 flex items-center px-3 text-white font-bold text-xs" style={{ width: '64%' }}>
                                        65
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 opacity-70">
                                <div className="w-12 text-sm font-bold text-right text-text-secondary">Top 10%</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-r-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-blue-500 flex items-center px-3 text-white font-bold text-xs" style={{ width: '89%' }}>
                                        89
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Tips */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-text-primary mb-4">IMPROVE YOUR SCORE</h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                                <span className="text-xs font-bold text-red-600 uppercase mb-1 block">High Priority (+35 pts)</span>
                                <p className="text-sm font-medium text-gray-800 mb-2">Upload Audited Financials</p>
                                <Button size="sm" variant="outline" className="w-full bg-white text-red-600 border-red-200 hover:bg-red-50">Upload Now</Button>
                            </div>

                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                <span className="text-xs font-bold text-yellow-600 uppercase mb-1 block">Medium Priority (+25 pts)</span>
                                <p className="text-sm font-medium text-gray-800 mb-2">Complete Operational Verification</p>
                                <Button size="sm" variant="outline" className="w-full bg-white text-yellow-600 border-yellow-200 hover:bg-yellow-50">Learn More</Button>
                            </div>

                            <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                                <span className="text-xs font-bold text-green-600 uppercase mb-1 block">Available (+10 pts)</span>
                                <p className="text-sm font-medium text-gray-800 mb-2">Update Team Profiles</p>
                                <Button size="sm" variant="outline" className="w-full bg-white text-green-600 border-green-200 hover:bg-green-50">Update</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
