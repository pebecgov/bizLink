"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileText, AlertTriangle, Shield, TrendingUp, Users, PieChart, Globe, FolderOpen, CheckCircle } from "lucide-react";
import { DocumentRequirementsList } from "@/components/dashboard/business/DocumentRequirementsList";
import {
    getAllDocumentRequirements,
} from "@/constants/documentTypes";
import { RegistrationLegalSection } from "@/components/dashboard/business/edit/sections/RegistrationLegalSection";
import { FinancialsSection } from "@/components/dashboard/business/edit/sections/FinancialsSection";
import { TeamManagementSection } from "@/components/dashboard/business/edit/sections/TeamManagementSection";
import { InvestmentInfoSection } from "@/components/dashboard/business/edit/sections/InvestmentInfoSection";
import { MarketCompetitionSection } from "@/components/dashboard/business/edit/sections/MarketCompetitionSection";

export default function DocumentsPage() {
    const myBusiness = useQuery(api.businessProfile.getMyBusinessProfile);
    const verificationDocs = useQuery(
        api.verificationScore.getVerificationDocuments,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );
    const verificationScore = useQuery(
        api.verificationScore.calculateVerificationScore,
        myBusiness?._id ? { businessId: myBusiness._id } : "skip"
    );

    const uploadDocument = useMutation(api.verificationScore.uploadVerificationDocument);
    const deleteDocument = useMutation(api.verificationScore.deleteVerificationDocument);
    const generateUploadUrl = useMutation(api.businessProfile.generateUploadUrl);

    const [uploadingDocs, setUploadingDocs] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState("legal");

    const handleUpload = async (docType: string, category: string, uploadFormats: string[] = []) => {
        if (!myBusiness) return;

        try {
            const formatToMimeType = (format: string): string => {
                const mimeTypes: Record<string, string> = {
                    'PDF': '.pdf,application/pdf',
                    'JPG': '.jpg,.jpeg,image/jpeg',
                    'PNG': '.png,image/png',
                    'JPEG': '.jpg,.jpeg,image/jpeg',
                    'DOC': '.doc,application/msword',
                    'DOCX': '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'XLSX': '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'XLS': '.xls,application/vnd.ms-excel',
                    'PPT': '.ppt,application/vnd.ms-powerpoint',
                    'PPTX': '.pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'SVG': '.svg,image/svg+xml',
                };
                return mimeTypes[format.toUpperCase()] || '';
            };

            const acceptFormats = uploadFormats.length > 0
                ? uploadFormats.map(f => formatToMimeType(f)).filter(Boolean).join(',')
                : '.pdf,.jpg,.jpeg,.png';

            const input = document.createElement("input");
            input.type = "file";
            input.accept = acceptFormats;

            input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;

                setUploadingDocs(prev => new Set([...prev, docType]));

                try {
                    const uploadUrl = await generateUploadUrl();
                    const result = await fetch(uploadUrl, {
                        method: "POST",
                        headers: { "Content-Type": file.type },
                        body: file,
                    });

                    const { storageId } = await result.json();

                    await uploadDocument({
                        businessId: myBusiness._id,
                        documentType: docType,
                        category: category as "core" | "sector_specific" | "additional",
                        fileUrl: storageId,
                        fileName: file.name,
                        fileSize: file.size,
                    });

                } catch (error) {
                    console.error("Failed to upload document:", error);
                    alert("Failed to upload document. Please try again.");
                } finally {
                    setUploadingDocs(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(docType);
                        return newSet;
                    });
                }
            };

            input.click();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const handleDelete = async (docId: string) => {
        if (!confirm("Are you sure you want to delete this document?")) return;
        try {
            await deleteDocument({ documentId: docId as any });
        } catch (error) {
            console.error("Failed to delete document:", error);
            alert("Failed to delete document. Please try again.");
        }
    };

    const handleView = (url: string) => {
        window.open(url, "_blank");
    };

    if (!myBusiness || !verificationDocs || !verificationScore) {
        return (
            <div className="max-w-6xl mx-auto pb-12 space-y-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    const docRequirements = getAllDocumentRequirements(myBusiness.subsector || "");

    // Filter out docs handled by specific sections
    const handledDocIds = new Set([
        "CAC_CERTIFICATE", "FORM_CAC_1_1", "MEMAT", "TIN_CERTIFICATE", "TAX_CLEARANCE",
        "FINANCIAL_STATEMENTS",
        "DIRECTORS_IDS",
        "BUSINESS_PLAN",
        "MARKET_RESEARCH"
    ]);

    const remainingCore = docRequirements.core.filter(d => !handledDocIds.has(d.id));
    const remainingSector = docRequirements.sectorSpecific.filter(d => !handledDocIds.has(d.id));
    const remainingAdditional = docRequirements.additional.filter(d => !handledDocIds.has(d.id));

    const tabs = [
        { id: "legal", label: "Registration & Legal", icon: Shield },
        { id: "financials", label: "Financials", icon: TrendingUp },
        { id: "team", label: "Team", icon: Users },
        { id: "investment", label: "Investment", icon: PieChart },
        { id: "market", label: "Market", icon: Globe },
        { id: "other", label: "Other Documents", icon: FolderOpen },
    ];

    const commonProps = {
        businessProfile: myBusiness,
        verificationDocs: verificationDocs,
        onUpload: handleUpload,
        onDelete: handleDelete,
        onView: handleView,
        uploadingDocs: uploadingDocs
    };

    return (
        <div className="max-w-6xl mx-auto pb-12 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Compliance & Documentation</h1>
                    <p className="text-text-secondary">Manage your business profile and verification documents</p>
                </div>
            </div>

            {/* Compliance Status Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        Verification Score: {verificationScore.totalPercentage}%
                    </h2>
                    <span className="text-sm text-text-secondary">
                        {verificationScore.verifiedDocumentsCount} Documents Verified
                    </span>
                </div>

                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-gradient-to-r from-primary-green to-green-400 rounded-full transition-all duration-500"
                        style={{ width: `${verificationScore.totalPercentage}%` }}
                    ></div>
                </div>

                {verificationScore.totalPercentage < 75 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-yellow-800 text-sm mb-1">
                                Action Required
                            </h3>
                            <p className="text-sm text-yellow-700">
                                Complete your profile and upload core documents to reach 75% verification.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex space-x-2 pb-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? "border-primary-green text-primary-green"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
                {activeTab === "legal" && <RegistrationLegalSection {...commonProps} />}
                {activeTab === "financials" && <FinancialsSection {...commonProps} />}
                {activeTab === "team" && <TeamManagementSection {...commonProps} />}
                {activeTab === "investment" && <InvestmentInfoSection {...commonProps} />}
                {activeTab === "market" && <MarketCompetitionSection {...commonProps} />}

                {activeTab === "other" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Additional Documents</h2>
                            <p className="text-sm text-gray-500 mt-2 mb-6">Upload any other documents required for your sector or business type.</p>
                        </div>

                        {(remainingCore.length > 0 || remainingSector.length > 0 || remainingAdditional.length > 0) ? (
                            <DocumentRequirementsList
                                coreDocuments={remainingCore}
                                sectorDocuments={remainingSector}
                                additionalDocuments={remainingAdditional}
                                uploadedDocuments={verificationDocs || []}
                                onUpload={handleUpload}
                                onDelete={handleDelete}
                                onView={handleView}
                                uploadingDocs={uploadingDocs}
                            />
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <p>All required documents are covered in the specific sections.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


