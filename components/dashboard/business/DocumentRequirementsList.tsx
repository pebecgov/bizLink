"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    FileText, Upload, CheckCircle, Clock, XCircle, AlertTriangle,
    Eye, Trash2, ChevronDown, ChevronUp, CheckCircle2, Loader2
} from "lucide-react";
import { DocumentRequirement } from "@/constants/documentTypes";

export interface UploadedDocument {
    _id: string;
    documentType: string;
    fileName: string;
    fileSize: number;
    status: "pending" | "verified" | "rejected" | "expired";
    fileUrl: string; // Storage ID
    uploadedAt: number;
    verifiedAt?: number;
    rejectionReason?: string;
    resolvedUrl?: string | null;
}

interface DocumentRequirementsListProps {
    coreDocuments: DocumentRequirement[];
    sectorDocuments: DocumentRequirement[];
    additionalDocuments: DocumentRequirement[];
    uploadedDocuments: UploadedDocument[];
    onUpload: (docType: string, category: string, uploadFormats?: string[]) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    uploadingDocs?: Set<string>;
}

export const DocumentItem = ({
    doc,
    status,
    onUpload,
    onDelete,
    onView,
    isUploading
}: {
    doc: DocumentRequirement;
    status?: {
        _id: string;
        status: "pending" | "verified" | "rejected" | "expired";
        fileUrl: string;
        fileName: string;
        fileSize: number;
        uploadedAt: number;
        rejectionReason?: string;
        resolvedUrl?: string | null;
    };
    onUpload: (file: File) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    isUploading: boolean;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUpload(file);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${status?.status === "verified"
                                ? "bg-green-50 text-green-600"
                                : "bg-blue-50 text-blue-600"
                                }`}>
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 flex gap-1 items-center">
                                    {doc.name}
                                    {doc.category === "core" && <span className="text-red-500 flex items-center">*</span>}
                                </h4>
                                <div className="flex gap-2 text-xs">

                                    {doc.category === "sector_specific" && (
                                        <span className="text-blue-600 font-bold uppercase tracking-wider">Sector</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-2 mt-2">{doc.description}</p>

                        {/* Status Badge */}
                        {status ? (
                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center gap-3">
                                    {status.status === "verified" && (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Verified
                                        </span>
                                    )}
                                    {status.status === "pending" && (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                            <Clock className="w-3.5 h-3.5" />
                                            Pending Verification
                                        </span>
                                    )}
                                    {status.status === "rejected" && (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                            <XCircle className="w-3.5 h-3.5" />
                                            Rejected: {status.rejectionReason}
                                        </span>
                                    )}
                                    {status.status === "expired" && (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            Expired
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                                    <span className="font-medium text-gray-700">{status.fileName}</span>
                                    <span>{formatFileSize(status.fileSize)}</span>
                                    <span>{new Date(status.uploadedAt).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onView(status.resolvedUrl || status.fileUrl || "")}
                                        disabled={!status.resolvedUrl && !status.fileUrl} // Disable if no URL
                                        className="h-7 text-xs gap-1.5 text-gray-600 hover:text-primary-green hover:bg-green-50"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        View
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(status._id)}
                                        className="h-7 text-xs gap-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept={doc.uploadFormats.map(f => `.${f.toLowerCase()}`).join(',')}
                                    onChange={handleFileChange}
                                />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="h-9 text-xs gap-2 border-dashed border-gray-300 hover:border-primary-green hover:text-primary-green hover:bg-green-50 w-full sm:w-auto transition-all"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-3.5 h-3.5" />
                                            Upload {doc.name}
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Details Toggle */}
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-xs text-primary-green hover:underline mt-3 flex items-center gap-1 font-medium"
                        >
                            {showDetails ? "Hide" : "Show"} requirements
                            {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showDetails && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 animate-in fade-in slide-in-from-top-1">
                                <p className="mb-2"><strong>Why needed:</strong> {doc.whyNeeded}</p>
                                <p className="mb-2"><strong>Issued By:</strong> {doc.issuedBy}</p>
                                {doc.verificationNotes && (
                                    <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-2 mt-2">
                                        Note: {doc.verificationNotes}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export function DocumentRequirementsList({
    coreDocuments,
    sectorDocuments,
    additionalDocuments,
    uploadedDocuments,
    onUpload,
    onDelete,
    onView,
    uploadingDocs = new Set(),
}: DocumentRequirementsListProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(["core", "sector"])
    );

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(section)) {
                newSet.delete(section);
            } else {
                newSet.add(section);
            }
            return newSet;
        });
    };

    const getUploadedDoc = (docType: string) => {
        return uploadedDocuments.find((d) => d.documentType === docType);
    };

    return (
        <div className="space-y-6">
            {/* Core Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                    onClick={() => toggleSection("core")}
                    className="w-full bg-red-50 border-b border-red-200 px-6 py-4 flex items-center justify-between hover:bg-red-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 rounded-full p-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-900">
                                <span className="text-red-500 mr-1">*</span>
                                Core Required Documents
                            </h3>
                            <p className="text-sm text-gray-600">
                                {coreDocuments.length} documents • All required for verification
                            </p>
                        </div>
                    </div>
                    {expandedSections.has("core") ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>

                {expandedSections.has("core") && (
                    <div className="p-6 space-y-4">
                        {coreDocuments.map((doc) => (
                            <DocumentItem
                                key={doc.id}
                                doc={doc}
                                status={getUploadedDoc(doc.id)}
                                onUpload={(file) => onUpload(doc.id, "core", doc.uploadFormats)}
                                onDelete={onDelete}
                                onView={onView}
                                isUploading={uploadingDocs.has(doc.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Sector-Specific Documents */}
            {sectorDocuments.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => toggleSection("sector")}
                        className="w-full bg-blue-50 border-b border-blue-200 px-6 py-4 flex items-center justify-between hover:bg-blue-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 rounded-full p-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900">Sector-Specific Documents</h3>
                                <p className="text-sm text-gray-600">
                                    {sectorDocuments.length} documents • Required for your industry
                                </p>
                            </div>
                        </div>
                        {expandedSections.has("sector") ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </button>

                    {expandedSections.has("sector") && (
                        <div className="p-6 space-y-4">
                            {sectorDocuments.map((doc) => (
                                <DocumentItem
                                    key={doc.id}
                                    doc={doc}
                                    status={getUploadedDoc(doc.id)}
                                    onUpload={(file) => onUpload(doc.id, "sector_specific", doc.uploadFormats)}
                                    onDelete={onDelete}
                                    onView={onView}
                                    isUploading={uploadingDocs.has(doc.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Additional Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                    onClick={() => toggleSection("additional")}
                    className="w-full bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 rounded-full p-2">
                            <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-900">Additional Supporting Documents</h3>
                            <p className="text-sm text-gray-600">
                                {additionalDocuments.length} documents • Optional but recommended
                            </p>
                        </div>
                    </div>
                    {expandedSections.has("additional") ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </button>

                {expandedSections.has("additional") && (
                    <div className="p-6 space-y-4">
                        {additionalDocuments.map((doc) => (
                            <DocumentItem
                                key={doc.id}
                                doc={doc}
                                status={getUploadedDoc(doc.id)}
                                onUpload={(file) => onUpload(doc.id, "additional", doc.uploadFormats)}
                                onDelete={onDelete}
                                onView={onView}
                                isUploading={uploadingDocs.has(doc.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

