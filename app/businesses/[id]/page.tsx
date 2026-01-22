"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Building2, MapPin, Users, TrendingUp, Phone, Mail, Globe, Calendar, Shield, Lock, ArrowLeft, ExternalLink, Verified, Briefcase, Loader2, Check } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BUSINESS_STAGES } from "@/components/dashboard/business/lib/sectorData";

// Helper to get stage label from value
const getStageLabel = (stageValue: string) => {
    const stage = BUSINESS_STAGES.find(s => s.value === stageValue);
    return stage ? stage.label : stageValue;
};

export default function PublicBusinessProfilePage() {
    const params = useParams();
    const businessId = params.id as string;
    const { isSignedIn, user } = useUser();

    // Check if user is an investor
    const isInvestor = user?.publicMetadata?.role === "investor";

    const business = useQuery(api.businessProfile.getBusinessById, {
        id: businessId as Id<"businesses">
    });

    // Connections & Mutations
    const initiateConnect = useMutation(api.connections.initiateConnection);
    const myConnections = useQuery(api.connections.getMyConnections);
    const [isConnecting, setIsConnecting] = useState(false);
    const recordView = useMutation(api.businessProfile.recordProfileView);

    useEffect(() => {
        if (businessId) {
            recordView({ businessId: businessId as Id<"businesses"> }).catch(console.error);
        }
    }, [businessId, recordView]);

    // Check if any connection exists for this business
    const existingConnection = myConnections?.find(c => c.businessId === businessId);
    const hasExpressedInterest = !!existingConnection;
    const connectionStatus = existingConnection?.status; // 'lead' | 'connected' | etc.

    const handleExpressInterest = async () => {
        if (!isSignedIn || isConnecting) return;

        setIsConnecting(true);
        try {
            await initiateConnect({ businessId: businessId as Id<"businesses"> });
            toast.success("Interest expressed! The business has been notified.");
        } catch (error) {
            console.error("Connection error:", error);
            toast.error("Failed to express interest. Please try again.");
        } finally {
            setIsConnecting(false);
        }
    };

    if (business === undefined) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-28 pb-16 container mx-auto px-6 max-w-4xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-64 bg-gray-200 rounded-xl"></div>
                        <div className="h-32 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (business === null) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-28 pb-16 container mx-auto px-6 max-w-4xl text-center">
                    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Not Found</h1>
                    <p className="text-gray-500 mb-6">The business you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link href="/businesses" className="text-green-600 hover:text-green-700 font-medium">
                        ← Back to Listed Businesses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 pt-28 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link href="/businesses" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Listed Businesses
                    </Link>

                    <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                            <Building2 className="w-10 h-10 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-white">
                                    {business.businessName}
                                </h1>
                                {business.verificationStatus === "verified" && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                                        <Verified className="w-3 h-3" />
                                        Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-green-100">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {business.state}{business.lga && `, ${business.lga}`}
                                </div>
                                {business.sector && (
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                        {business.sector}
                                    </span>
                                )}
                                {isInvestor && business.businessStage && (
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                        {getStageLabel(business.businessStage)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 max-w-4xl py-8 -mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {business.companyDescription || "No description provided."}
                            </p>

                            {business.missionStatement && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Mission</h3>
                                    <p className="text-gray-600 text-sm">{business.missionStatement}</p>
                                </div>
                            )}
                        </div>

                        {/* Business Details - Public */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Business Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {business.sector && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Sector</dt>
                                        <dd className="font-medium text-gray-900">{business.sector}</dd>
                                    </div>
                                )}
                                {business.subsector && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Subsector</dt>
                                        <dd className="font-medium text-gray-900">{business.subsector}</dd>
                                    </div>
                                )}
                                {business.numberOfEmployees && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Employees</dt>
                                        <dd className="font-medium text-gray-900">{business.numberOfEmployees}</dd>
                                    </div>
                                )}
                                {business.yearEstablished && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Established</dt>
                                        <dd className="font-medium text-gray-900">{business.yearEstablished}</dd>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Locked Content - Only for signed in users */}
                        {!isSignedIn ? (
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    Sign In to See More Details
                                </h3>
                                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                    Contact information, financial details, and investment opportunities are available to registered users.
                                </p>
                                <SignInButton mode="modal">
                                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg">
                                        Sign In to View Full Profile
                                    </button>
                                </SignInButton>
                            </div>
                        ) : (
                            <>
                                {/* Contact Information - Only for signed in */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
                                    <div className="space-y-3">
                                        {business.contactName && (
                                            <div className="flex items-center gap-3">
                                                <Users className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-700">{business.contactName}</span>
                                            </div>
                                        )}
                                        {business.contactPhone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-700">{business.contactPhone}</span>
                                            </div>
                                        )}
                                        {business.primaryEmail && (
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-700">{business.primaryEmail}</span>
                                            </div>
                                        )}
                                        {business.website && (
                                            <div className="flex items-center gap-3">
                                                <Globe className="w-5 h-5 text-gray-400" />
                                                <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                                    {business.website}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Financial Details - Only for signed in */}
                                {isInvestor && (business.fundingAmount || business.annualRevenue) && (
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <h2 className="text-lg font-bold text-gray-900 mb-4">Financial Information</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {business.fundingAmount && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Funding Sought</dt>
                                                    <dd className="font-bold text-green-600 text-xl">{business.fundingAmount}</dd>
                                                </div>
                                            )}
                                            {business.annualRevenue && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Annual Revenue</dt>
                                                    <dd className="font-bold text-gray-900 text-xl">{business.annualRevenue}</dd>
                                                </div>
                                            )}
                                            {business.equityOffered && (
                                                <div>
                                                    <dt className="text-sm text-gray-500">Equity Offered</dt>
                                                    <dd className="font-medium text-gray-900">{business.equityOffered}</dd>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Investment Status */}
                        {isInvestor && business.seekingFunding && (
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="w-5 h-5" />
                                    <h3 className="font-bold">Seeking Investment</h3>
                                </div>
                                {business.fundingAmount && (
                                    <p className="text-3xl font-bold mb-2">{business.fundingAmount}</p>
                                )}
                                {isSignedIn ? (
                                    <button
                                        onClick={handleExpressInterest}
                                        disabled={isConnecting || hasExpressedInterest}
                                        className={`w-full mt-4 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${hasExpressedInterest
                                            ? "bg-green-100/20 text-white cursor-default border border-white/20"
                                            : "bg-white text-green-600 hover:bg-green-50 shadow-md"
                                            }`}
                                    >
                                        {isConnecting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : hasExpressedInterest ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                {connectionStatus === "connected" ? "Already Connected" : "Interest Sent"}
                                            </>
                                        ) : (
                                            "Express Interest"
                                        )}
                                    </button>
                                ) : (
                                    <SignInButton mode="modal">
                                        <button className="w-full mt-4 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md">
                                            Sign In to Connect
                                        </button>
                                    </SignInButton>
                                )}
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 text-sm">Location</span>
                                    <span className="font-medium text-gray-900 text-sm">{business.state}</span>
                                </div>
                                {business.numberOfEmployees && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm">Team Size</span>
                                        <span className="font-medium text-gray-900 text-sm">{business.numberOfEmployees}</span>
                                    </div>
                                )}
                                {isInvestor && business.businessStage && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm">Stage</span>
                                        <span className="font-medium text-gray-900 text-sm">{getStageLabel(business.businessStage)}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 text-sm">Status</span>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${business.verificationStatus === "verified"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {business.verificationStatus === "verified" ? "Verified" : "Pending"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-blue-700">
                                <Shield className="w-5 h-5" />
                                <span className="font-medium text-sm">PEBEC Verified Business</span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                                This business has been verified through the PEBEC BizLink platform.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
