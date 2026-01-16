"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, FileText, Download, Eye, Upload, ChevronRight, AlertCircle } from "lucide-react";

// Static mock data (to be replaced with backend data later)
const documentsData = {
    documentsSummary: {
        complianceStatus: 78,
        totalRequired: 12,
        uploaded: 9,
        alerts: 3,
    },
    documents: [
        {
            category: "Registration & Legal",
            status: "Complete",
            count: "4 documents",
            items: [
                { name: "CAC Registration Certificate", id: "RC123456", status: "Verified", date: "Jan 15, 2020", alert: null },
                { name: "Memorandum & Articles of Association", id: "-", status: "Verified", date: "Jan 15, 2020", alert: null },
                { name: "Tax Identification Number (TIN)", id: "12345678-0001", status: "Verified", date: "Feb 1, 2020", alert: null },
                { name: "Tax Clearance Certificate", id: "TCC2024001", status: "Expiring Soon", date: "Jan 1, 2024", alert: "Expires in 15 days - renew now" },
            ],
        },
        {
            category: "Financial Documents",
            status: "Incomplete",
            count: "3 documents",
            items: [
                { name: "Audited Financial Statements 2023", id: "-", status: "Verified", date: "Mar 1, 2024", alert: null },
                { name: "Audited Financial Statements 2024", id: "-", status: "Missing", date: "-", alert: "Required for compliance" },
                { name: "Bank Reference Letter", id: "-", status: "Verified", date: "Nov 15, 2024", alert: null },
            ],
        },
    ],
};

export default function DocumentsPage() {
    const { documentsSummary, documents } = documentsData;

    return (
        <div className="max-w-6xl mx-auto pb-12 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Business Documents</h1>
                    <p className="text-text-secondary">Manage and track your compliance documentation</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Document Request Center</Button>
                    <Button className="bg-primary-green hover:bg-green-700 text-white gap-2">
                        <Upload className="w-4 h-4" /> Upload Multiple
                    </Button>
                </div>
            </div>

            {/* Compliance Status Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        Document Compliance Status: {documentsSummary.complianceStatus}%
                    </h2>
                    <span className="text-sm text-text-secondary">
                        {documentsSummary.uploaded}/{documentsSummary.totalRequired} Required Documents Uploaded
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-gradient-to-r from-primary-green to-green-400 rounded-full"
                        style={{ width: `${documentsSummary.complianceStatus}%` }}
                    ></div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                    <div>
                        <h3 className="font-semibold text-yellow-800 text-sm mb-1">
                            {documentsSummary.alerts} Documents Require Attention
                        </h3>
                        <ul className="text-sm text-yellow-700 space-y-1 ml-1 list-disc list-inside">
                            <li>Tax Clearance Certificate expires in 15 days</li>
                            <li>Operating License pending verification</li>
                            <li>Audited financials for 2024 missing</li>
                        </ul>
                        <Button variant="link" className="text-yellow-800 p-0 h-auto text-sm mt-2 font-medium">
                            View All Alerts
                        </Button>
                    </div>
                </div>
            </div>

            {/* Document Categories */}
            <div className="space-y-6">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Document Categories</h2>

                {documents.map((category, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Category Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {category.status === "Complete" ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                                )}
                                <h3 className="font-bold text-text-primary">{category.category}</h3>
                                <span className="text-xs font-medium px-2 py-0.5 bg-white border border-gray-200 rounded-full text-gray-600">
                                    {category.count}
                                </span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary-green hover:bg-green-50">
                                Upload New
                            </Button>
                        </div>

                        {/* Documents List */}
                        <div className="divide-y divide-gray-100">
                            {category.items.map((doc, docIdx) => (
                                <div key={docIdx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-text-primary">{doc.name}</h4>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary mt-1">
                                                {doc.id !== "-" && <span>ID: {doc.id}</span>}
                                                <span className={`flex items-center gap-1 ${doc.status === "Verified" ? "text-green-600" :
                                                    doc.status === "Missing" ? "text-red-600" :
                                                        doc.status === "Expiring Soon" ? "text-yellow-600" : "text-gray-500"
                                                    }`}>
                                                    {doc.status === "Verified" && <CheckCircle className="w-3 h-3" />}
                                                    {doc.status}
                                                </span>
                                                {doc.date !== "-" && <span>Date: {doc.date}</span>}
                                            </div>
                                            {doc.alert && (
                                                <p className="text-xs text-yellow-600 font-medium mt-1">{doc.alert}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end md:self-auto">
                                        {doc.status === "Missing" ? (
                                            <Button size="sm" className="bg-primary-green hover:bg-green-700 text-white">
                                                <Upload className="w-3 h-3 mr-2" /> Upload
                                            </Button>
                                        ) : (
                                            <>
                                                <Button size="sm" variant="outline" className="text-gray-600 h-8 px-3">
                                                    <Eye className="w-3 h-3 mr-2" /> View
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-gray-600 h-8 px-3">
                                                    <Download className="w-3 h-3" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center pt-4">
                <Button variant="outline" className="text-gray-500">
                    Show More Categories
                </Button>
            </div>
        </div>
    );
}
