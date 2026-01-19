"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Building, CheckCircle, TrendingUp, FileText } from "lucide-react";

export default function ApprovedBusinessesPage() {
    const approvedBusinesses = useQuery(api.adminVerification.getApprovedBusinesses);

    if (!approvedBusinesses) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    const fullyVerified = approvedBusinesses.filter(b => b.progressPercentage === 100);
    const partiallyVerified = approvedBusinesses.filter(b => b.progressPercentage < 100 && b.progressPercentage > 0);

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Approved Business Documents</h1>
                    <p className="text-gray-600 mt-1">
                        View businesses with verified documents
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                        <span className="text-2xl font-bold">{fullyVerified.length}</span>
                        <span className="text-sm block">Fully Verified</span>
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
                        <span className="text-2xl font-bold">{partiallyVerified.length}</span>
                        <span className="text-sm block">Partial</span>
                    </div>
                </div>
            </div>

            {/* Fully Verified Businesses */}
            {fullyVerified.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        Fully Verified Businesses ({fullyVerified.length})
                    </h2>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Business</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Sector</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Documents</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Verification Score</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {fullyVerified.map((business) => (
                                    <BusinessRow key={business._id} business={business} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Partially Verified Businesses */}
            {partiallyVerified.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        Partially Verified Businesses ({partiallyVerified.length})
                    </h2>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Business</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Sector</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Documents</th>
                                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Verification Score</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Progress</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {partiallyVerified.map((business) => (
                                    <BusinessRow key={business._id} business={business} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {approvedBusinesses.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Approved Documents</h3>
                    <p className="text-gray-600">No businesses have approved documents yet.</p>
                </div>
            )}
        </div>
    );
}

// Business Row Component
function BusinessRow({ business }: { business: any }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{business.businessName}</p>
                        <p className="text-sm text-gray-500">{business.subsector}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="text-sm text-gray-700">{business.sector}</span>
            </td>
            <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                        {business.approvedCount}/{business.totalDocuments}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        approved
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-blue-600">{business.verificationPercentage}%</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Document Progress</span>
                        <span className="font-semibold text-gray-900">{business.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${business.progressPercentage === 100
                                    ? "bg-green-600"
                                    : "bg-blue-600"
                                }`}
                            style={{ width: `${business.progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </td>
        </tr>
    );
}
