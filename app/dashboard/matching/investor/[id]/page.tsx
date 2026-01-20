"use client";

import { useState } from "react";
import {
    MapPin,
    Globe,
    Mail,
    Phone,
    Linkedin,
    Twitter,
    Building,
    Receipt,
    Award,
    Briefcase,
    Target,
    ArrowLeft,
    CheckCircle,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

// Force rebuild


// Mock data to simulate fetching by ID
// In a real app, this would be a Convex query: api.investors.getById({ id })
const MOCK_INVESTOR_DETAILS = {
    id: "1",
    userId: "user_123",
    registeredName: "Pan-African Ventures",
    type: "Venture Capital",
    jurisdiction: "Nigeria",
    description: "Pan-African Ventures is a leading early-stage venture capital firm dedicated to empowering tech entrepreneurs across the continent. We focus on scalable solutions that address real-world challenges in Fintech, AgriTech, and HealthTech.",

    // Contact & Socials
    website: "https://panafrican.vc",
    email: "contact@panafrican.vc",
    phone: "+234 800 123 4567",
    socialMedia: {
        linkedin: "https://linkedin.com/company/pan-african-ventures",
        twitter: "https://twitter.com/panafricanvc"
    },

    // Investment Preferences (matching schema)
    sectors: ["Fintech", "AgriTech", "HealthTech", "Logistics"],
    regions: ["West Africa", "East Africa"],
    capitalRange: "$50k - $500k",
    riskAppetite: "High",
    businessStages: ["Pre-Seed", "Seed", "Series A"],

    // Verification / Legal
    taxIdType: "TIN",
    taxIdentificationNumber: "12345678-0001",
    kycStatus: "Verified",

    // Portfolio / Stats
    totalInvestments: 24,
    activePortfolio: 18,
    exits: 3,

    // Additional Info
    investmentThesis: "We believe in the power of technology to leapfrog traditional infrastructure gaps. We back founders who are building the rails for Africa's digital economy.",
    valueAdd: ["Strategic Mentorship", "Regulatory Support", "Market Access", "Hiring Network"]
};

export default function InvestorDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    // In a real implementation, useQuery(api.investors.get, { id: params.id })
    const investor = MOCK_INVESTOR_DETAILS; // Simulating data fetch

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <Button
                variant="ghost"
                className="gap-2 text-gray-500 hover:text-gray-900 pl-0"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-4 h-4" /> Back to Listings
            </Button>

            {/* Header Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex items-start gap-5">
                        <div className="w-20 h-20 rounded-xl bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-100">
                            {investor.registeredName.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{investor.registeredName}</h1>
                                {investor.kycStatus === "Verified" && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Verified Investor
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                    <Building className="w-4 h-4" /> {investor.type}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> {investor.jurisdiction}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    <a href={investor.website} target="_blank" className="hover:text-blue-600 hover:underline">
                                        Website
                                    </a>
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <Linkedin className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <Twitter className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                            Connect with Investor
                        </Button>
                        <Button variant="outline" className="w-full md:w-auto">
                            Save to Watchlist
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Info */}
                <div className="lg:col-span-2 space-y-6">

                    {/* About Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {investor.description}
                        </p>

                        <h3 className="font-medium text-gray-900 mb-2">Our Investment Thesis</h3>
                        <p className="text-gray-600 leading-relaxed italic bg-gray-50 p-4 rounded-lg border border-gray-100">
                            "{investor.investmentThesis}"
                        </p>
                    </div>

                    {/* Investment Focus */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Focus</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Priority Sectors</h3>
                                <div className="flex flex-wrap gap-2">
                                    {investor.sectors.map(sector => (
                                        <Badge key={sector} variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100">
                                            {sector}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Geographic Regions</h3>
                                <div className="flex flex-wrap gap-2">
                                    {investor.regions.map(region => (
                                        <Badge key={region} variant="outline">
                                            {region}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Receipt className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-500">Capital Range</span>
                                </div>
                                <p className="font-semibold text-gray-900">{investor.capitalRange}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Award className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-500">Business Stage</span>
                                </div>
                                <p className="font-semibold text-gray-900">{investor.businessStages.join(", ")}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Target className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-500">Risk Appetite</span>
                                </div>
                                <p className="font-semibold text-gray-900">{investor.riskAppetite}</p>
                            </div>
                        </div>
                    </div>

                    {/* Value Add */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Value Beyond Capital</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {investor.valueAdd.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
                        <h3 className="font-medium text-gray-300 mb-6 uppercase text-xs tracking-wider">Investment Activity</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="text-3xl font-bold">{investor.totalInvestments}</div>
                                <div className="text-sm text-gray-400">Total Investments</div>
                            </div>
                            <Separator className="bg-gray-700" />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xl font-bold">{investor.activePortfolio}</div>
                                    <div className="text-xs text-gray-400">Active Portfolio</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold">{investor.exits}</div>
                                    <div className="text-xs text-gray-400">Successful Exits</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal / Compliance */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Compliance Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500">KYC Status</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500">Tax ID Type</span>
                                <span className="text-sm font-medium">{investor.taxIdType}</span>
                            </div>
                            <div className="contact-info pt-2">
                                <span className="text-xs text-gray-400 block mb-1">Office Contact</span>
                                <p className="text-sm text-gray-600">{investor.phone}</p>
                                <p className="text-sm text-gray-600">{investor.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Downloads / Resources */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Shared Resources</h3>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 text-left">
                                <div className="bg-gray-100 p-2 rounded">
                                    <Download className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="font-medium text-sm truncate">Term Sheet Template.pdf</div>
                                    <div className="text-xs text-gray-500">PDF • 2.4 MB</div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
