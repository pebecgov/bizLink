"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
    FileText, CheckCircle, XCircle, Eye, Clock, Building, TrendingUp, AlertTriangle
} from "lucide-react";

export default function PendingVerificationsPage() {
    const pendingBusinesses = useQuery(api.adminVerification.getPendingBusinesses);
    const [selectedBusinessId, setSelectedBusinessId] = useState<Id<"business"> | null>(null);

    if (!pendingBusinesses) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pending Document Verifications</h1>
                    <p className="text-gray-600 mt-1">
                        Review and approve business verification documents
                    </p>
                </div>
                <div className="bg-primary-green text-white px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold">{pendingBusinesses.length}</span>
                    <span className="text-sm ml-2">Businesses Pending</span>
                </div>
            </div>

            {/* Businesses List */}
            {pendingBusinesses.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending verification documents at the moment.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Business</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Sector</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Documents</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Progress</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pendingBusinesses.map((business) => (
                                <tr key={business._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center">
                                                <Building className="w-5 h-5 text-primary-green" />
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
                                            <span className="text-lg font-bold text-gray-900">
                                                {business.approvedCount}/{business.totalDocuments}
                                            </span>
                                            {business.pendingCount > 0 && (
                                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                                                    {business.pendingCount} pending
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-semibold text-gray-900">{business.progressPercentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-primary-green h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${business.progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Button
                                            onClick={() => setSelectedBusinessId(business._id)}
                                            className="bg-primary-green hover:bg-green-700 text-white"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Review Documents
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Document Review Modal */}
            {selectedBusinessId && (
                <DocumentReviewModal
                    businessId={selectedBusinessId}
                    onClose={() => setSelectedBusinessId(null)}
                />
            )}
        </div>
    );
}

// Document Review Modal Component
function DocumentReviewModal({ businessId, onClose }: { businessId: Id<"business">; onClose: () => void }) {
    const documents = useQuery(api.adminVerification.getBusinessDocuments, { businessId });
    const approveDoc = useMutation(api.adminVerification.approveDocument);
    const rejectDoc = useMutation(api.adminVerification.rejectDocument);

    const [rejectingDocId, setRejectingDocId] = useState<Id<"verification_documents"> | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [processing, setProcessing] = useState<Id<"verification_documents"> | null>(null);

    const handleApprove = async (docId: Id<"verification_documents">) => {
        setProcessing(docId);
        try {
            await approveDoc({ documentId: docId, reviewedBy: "Admin" });
        } catch (error) {
            console.error("Error approving document:", error);
            alert("Failed to approve document");
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async () => {
        if (!rejectingDocId || !rejectionReason.trim()) {
            alert("Please provide a rejection reason");
            return;
        }

        setProcessing(rejectingDocId);
        try {
            await rejectDoc({
                documentId: rejectingDocId,
                rejectionReason: rejectionReason.trim(),
                reviewedBy: "Admin",
            });
            setRejectingDocId(null);
            setRejectionReason("");
        } catch (error) {
            console.error("Error rejecting document:", error);
            alert("Failed to reject document");
        } finally {
            setProcessing(null);
        }
    };

    if (!documents) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                    <div className="p-6 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-24 bg-gray-200 rounded"></div>
                            <div className="h-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const pendingDocs = documents.filter(d => d.status === "pending");
    const verifiedDocs = documents.filter(d => d.status === "verified");
    const rejectedDocs = documents.filter(d => d.status === "rejected");

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-green to-green-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Document Review</h2>
                            <p className="text-green-50 mt-1">Review and verify business documents</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Documents List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Pending Documents */}
                    {pendingDocs.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-600" />
                                Pending Review ({pendingDocs.length})
                            </h3>
                            <div className="space-y-3">
                                {pendingDocs.map((doc) => (
                                    <DocumentItem
                                        key={doc._id}
                                        doc={doc}
                                        onApprove={() => handleApprove(doc._id)}
                                        onReject={() => setRejectingDocId(doc._id)}
                                        processing={processing === doc._id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Verified Documents */}
                    {verifiedDocs.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Verified ({verifiedDocs.length})
                            </h3>
                            <div className="space-y-3">
                                {verifiedDocs.map((doc) => (
                                    <DocumentItem key={doc._id} doc={doc} readOnly />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rejected Documents */}
                    {rejectedDocs.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-red-600" />
                                Rejected ({rejectedDocs.length})
                            </h3>
                            <div className="space-y-3">
                                {rejectedDocs.map((doc) => (
                                    <DocumentItem key={doc._id} doc={doc} readOnly />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Rejection Modal */}
                {rejectingDocId && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Reject Document</h3>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Enter rejection reason..."
                                className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary-green"
                            />
                            <div className="flex gap-3 mt-4">
                                <Button
                                    onClick={handleReject}
                                    disabled={!rejectionReason.trim() || processing === rejectingDocId}
                                    className="bg-red-600 hover:bg-red-700 text-white flex-1"
                                >
                                    Confirm Rejection
                                </Button>
                                <Button
                                    onClick={() => {
                                        setRejectingDocId(null);
                                        setRejectionReason("");
                                    }}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Document Item Component
function DocumentItem({
    doc,
    onApprove,
    onReject,
    processing,
    readOnly,
}: {
    doc: any;
    onApprove?: () => void;
    onReject?: () => void;
    processing?: boolean;
    readOnly?: boolean;
}) {
    const getStatusBadge = () => {
        const badges = {
            pending: (
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    Pending Review
                </span>
            ),
            verified: (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Verified
                </span>
            ),
            rejected: (
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    Rejected
                </span>
            ),
        };
        return badges[doc.status as keyof typeof badges];
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{doc.documentType}</h4>
                            {getStatusBadge()}
                        </div>
                        <p className="text-sm text-gray-600">📄 {doc.fileName}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                        {doc.rejectionReason && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm">
                                <p className="text-red-900 font-medium">Rejection Reason:</p>
                                <p className="text-red-700">{doc.rejectionReason}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                    {doc.resolvedUrl && (
                        <Button
                            onClick={() => window.open(doc.resolvedUrl, "_blank")}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                        >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                        </Button>
                    )}
                    {!readOnly && doc.status === "pending" && (
                        <>
                            <Button
                                onClick={onApprove}
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                size="sm"
                            >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Approve
                            </Button>
                            <Button
                                onClick={onReject}
                                disabled={processing}
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 text-xs"
                                size="sm"
                            >
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
