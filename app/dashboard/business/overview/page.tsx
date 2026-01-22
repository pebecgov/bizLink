"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BadgeCheck, Building2, Calendar, Globe, MapPin, Phone, Mail, Award, Users, DollarSign, Briefcase, Shield, FileText, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0-1 13.6 6.84 6.84 0 0 0 6.82-6.85V7.93a8.62 8.62 0 0 0 4.3 1.53V6.03a4.86 4.86 0 0 1-.89-.04Z" />
    </svg>
);

export default function BusinessOverviewPage() {
    // Fetch real business profile data
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);

    // Loading state
    if (businessProfile === undefined) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading business profile...</p>
                </div>
            </div>
        );
    }

    // No profile found
    if (!businessProfile) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No Business Profile Found</h2>
                    <p className="text-gray-600 mb-4">Complete onboarding to create your business profile</p>
                    <Link href="/onboarding">
                        <Button className="bg-primary-green hover:bg-green-700">Complete Onboarding</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Use real data with sensible defaults for optional fields
    console.log("Business Profile:", businessProfile);
    console.log("Logo URL:", businessProfile?.logoUrl);

    const displayData = {
        companyName: businessProfile.businessName || businessProfile.tradingName || "Your Company",
        companyTagline: businessProfile.companyTagline || "Add a tagline to describe your business",
        companyDescription: businessProfile.companyDescription || "Add a detailed description of your company",
        credibilityScore: businessProfile.credibilityScore || 0,
        lga: businessProfile.lga || "N/A",
        state: businessProfile.state || "N/A",
        operatingCountries: businessProfile.operatingCountries || [],
        registrationNumber: businessProfile.registrationNumber || "N/A",
        tinNumber: businessProfile.tinNumber || "N/A",
        yearEstablished: businessProfile.yearEstablished || new Date().getFullYear(),
        companyType: businessProfile.companyType || "Private Limited Company",
        annualRevenue: businessProfile.annualRevenue || "Not disclosed",
        numberOfEmployees: businessProfile.numberOfEmployees || "Not disclosed",
        sector: businessProfile.sector || "N/A",
        subsector: businessProfile.subsector || "N/A",
        contactPhone: businessProfile.contactPhone || "N/A",
        primaryEmail: businessProfile.primaryEmail || "N/A",
        website: businessProfile.website || "N/A",
        headOfficeAddress: businessProfile.headOfficeAddress || {
            street: "Address not provided",
            city: businessProfile.lga || "N/A",
            state: businessProfile.state || "N/A",
            country: "Nigeria",
        },
        socialMedia: businessProfile.socialMedia || {},
        branches: businessProfile.branches || [],
        missionStatement: businessProfile.missionStatement || "Add your mission statement",
        visionStatement: businessProfile.visionStatement || "Add your vision statement",
        imageGallery: businessProfile.imageGallery || [],
        businessModel: businessProfile.businessModel || "N/A",
        targetMarket: businessProfile.targetMarket || "N/A",
    };



    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">

            {/* Header / Identity Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary-green/10 to-gold/10 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Link href="/dashboard/business/edit">
                            <Button variant="outline" className="bg-white/80 hover:bg-white text-primary-green border-primary-green/20">
                                Edit Profile
                            </Button>
                        </Link>
                        <Button variant="outline" className="bg-white/80 hover:bg-white text-gray-600 border-gray-200">
                            Download PDF
                        </Button>
                    </div>
                </div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-start">
                        <div className="flex gap-6 -mt-12 items-end">
                            <div className="w-32 h-32 bg-white rounded-xl shadow-lg border-4 border-white flex items-center justify-center p-2 overflow-hidden relative">
                                {businessProfile.logoUrl ? (
                                    <img
                                        src={businessProfile.logoUrl}
                                        alt={displayData.companyName}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary-green/5 rounded-lg flex items-center justify-center text-primary-green">
                                        <Building2 className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <div className="mb-1">
                                <h1 className="text-3xl font-bold text-text-primary flex items-center gap-2">
                                    {displayData.companyName}
                                    <BadgeCheck className="w-6 h-6 text-blue-500" />
                                </h1>
                                <p className="text-text-secondary text-lg">{displayData.companyTagline}</p>
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200 text-sm font-medium mb-2">
                                <Award className="w-4 h-4" />
                                Credibility Score: {displayData.credibilityScore}/100
                            </div>
                            <div className="flex items-center justify-end gap-2 text-text-secondary text-sm">
                                <MapPin className="w-4 h-4" />
                                {displayData.lga}, {displayData.state}
                                <span className="text-gray-300">|</span>
                                <Globe className="w-4 h-4" />
                                Operating in {displayData.operatingCountries.length} countries
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* About Us */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-text-primary mb-4 border-b border-gray-100 pb-2">ABOUT US</h2>
                        <div className="prose text-text-secondary leading-relaxed whitespace-pre-line">
                            {displayData.companyDescription}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h3 className="font-semibold text-primary-green mb-2">MISSION</h3>
                                <p className="text-sm text-text-secondary italic">&quot;{displayData.missionStatement}&quot;</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h3 className="font-semibold text-primary-green mb-2">VISION</h3>
                                <p className="text-sm text-text-secondary italic">&quot;{displayData.visionStatement}&quot;</p>
                            </div>
                        </div>
                    </section>

                    {/* Registration Details */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-text-primary mb-4 border-b border-gray-100 pb-2">REGISTRATION DETAILS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase">CAC Number</p>
                                    <p className="font-semibold text-text-primary">{displayData.registrationNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase">TIN Number</p>
                                    <p className="font-semibold text-text-primary">{displayData.tinNumber}</p>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                                    <BadgeCheck className="w-5 h-5" />
                                    <span className="font-medium text-sm">Verified by PEBEC BizLink</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Photo Gallery */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                            <h2 className="text-lg font-bold text-text-primary">PHOTO GALLERY</h2>
                            <span className="text-sm text-primary-green cursor-pointer hover:underline">View All</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {displayData.imageGallery.map((src, i) => (
                                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer">
                                    {/* Placeholder for images */}
                                    {/* <Image src={src} ... /> */}
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        Img {i + 1}
                                    </div>
                                    {i === 3 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium text-sm">
                                            +6 more
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-8">

                    {/* Key Info Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-text-primary mb-4 border-b border-gray-100 pb-2">KEY INFORMATION</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Established</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.yearEstablished}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Type</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.companyType}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Annual Revenue</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.annualRevenue}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Employees</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.numberOfEmployees}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Business Model</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.businessModel}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Target Market</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.targetMarket}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Sector</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.sector} &gt; {displayData.subsector}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-text-secondary">Location</span>
                                    <span className="text-sm font-medium text-text-primary">{displayData.lga}, {displayData.state}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-text-primary mb-4 border-b border-gray-100 pb-2">CONTACT INFO</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-green" />
                                <span className="text-sm text-text-primary">{displayData.contactPhone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-green" />
                                <span className="text-sm text-text-primary underline cursor-pointer">{displayData.primaryEmail}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-primary-green" />
                                <span className="text-sm text-text-primary underline cursor-pointer">{displayData.website}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-green shrink-0" />
                                <span className="text-sm text-text-primary">{displayData.headOfficeAddress.street}, {displayData.headOfficeAddress.city}</span>
                            </li>
                        </ul>

                        <div className="mt-6 flex gap-3">
                            {Object.entries(displayData.socialMedia).map(([platform, url]) => {
                                if (!url) return null;

                                const getSocialConfig = (p: string) => {
                                    switch (p.toLowerCase()) {
                                        case 'facebook': return { icon: Facebook, color: 'text-blue-600 bg-blue-50 hover:bg-blue-600', label: 'Facebook' };
                                        case 'twitter': return { icon: Twitter, color: 'text-sky-500 bg-sky-50 hover:bg-sky-500', label: 'Twitter' };
                                        case 'instagram': return { icon: Instagram, color: 'text-pink-600 bg-pink-50 hover:bg-pink-600', label: 'Instagram' };
                                        case 'linkedin': return { icon: Linkedin, color: 'text-blue-700 bg-blue-50 hover:bg-blue-700', label: 'LinkedIn' };
                                        case 'tiktok': return { icon: TikTokIcon, color: 'text-black bg-gray-50 hover:bg-black', label: 'TikTok' };
                                        default: return { icon: Globe, color: 'text-gray-600 bg-gray-100 hover:bg-gray-600', label: p };
                                    }
                                };

                                const config = getSocialConfig(platform);
                                const Icon = config.icon;

                                return (
                                    <Link
                                        href={url as string}
                                        key={platform}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:text-white ${config.color}`}
                                        title={config.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Branches Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-text-primary mb-4 border-b border-gray-100 pb-2">BRANCHES</h2>
                        <div className="space-y-4">
                            {displayData.branches && displayData.branches.length > 0 ? (
                                displayData.branches.map((branch: any, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                                        <Building2 className="w-4 h-4 text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-text-primary">{branch.name}</p>
                                            <p className="text-xs text-text-secondary">{branch.address}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">No additional branches listed.</p>
                            )}
                        </div>
                        <Link href="/dashboard/business/edit?section=location">
                            <Button variant="ghost" className="w-full mt-4 text-primary-green hover:text-green-700 hover:bg-green-50 text-sm h-8">
                                Manage Branches
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

