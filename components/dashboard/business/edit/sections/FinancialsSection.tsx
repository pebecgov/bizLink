"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentItem, UploadedDocument } from "@/components/dashboard/business/DocumentRequirementsList";
import { CORE_DOCUMENTS, ADDITIONAL_DOCUMENTS } from "@/constants/documentTypes";

interface FinancialsSectionProps {
    businessProfile: Doc<"businesses">;
    verificationDocs: UploadedDocument[];
    onUpload: (docType: string, category: string, uploadFormats?: string[]) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    uploadingDocs: Set<string>;
}

export function FinancialsSection({
    businessProfile,
    verificationDocs,
    onUpload,
    onDelete,
    onView,
    uploadingDocs
}: FinancialsSectionProps) {
    const { toast } = useToast();
    const updateFinancials = useMutation(api.businessProfile.updateFinancials);
    const [isLoading, setIsLoading] = useState(false);

    // Helper to find doc
    const getDocReq = (id: string) =>
        CORE_DOCUMENTS.find(d => d.id === id) ||
        ADDITIONAL_DOCUMENTS.find(d => d.id === id);

    const getUploadedDoc = (id: string) =>
        verificationDocs.find(d => d.documentType === id);

    const financialDoc = getDocReq("FINANCIAL_STATEMENTS");

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            await updateFinancials({
                businessId: businessProfile._id,
                numberOfEmployees: formData.get("numberOfEmployees") as string || undefined,
                annualRevenue: formData.get("annualRevenue") as string || undefined,
            });

            toast({
                title: "Success",
                description: "Financial information updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update information. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Company Size & Financials</h2>
                <p className="text-sm text-gray-500 mt-2">Provide information about your company&apos;s size and financial standing</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="numberOfEmployees">Number of Employees *</Label>
                        <select
                            id="numberOfEmployees"
                            name="numberOfEmployees"
                            defaultValue={businessProfile.numberOfEmployees || ""}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            required
                        >
                            <option value="">Select range</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="201-500">201-500</option>
                            <option value="500+">500+</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                        <select
                            id="annualRevenue"
                            name="annualRevenue"
                            defaultValue={businessProfile.annualRevenue || ""}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            required
                        >
                            <option value="">Select range</option>
                            <option value="Under ₦1M">Under ₦1M</option>
                            <option value="₦1M-₦10M">₦1M-₦10M</option>
                            <option value="₦10M-₦100M">₦10M-₦100M</option>
                            <option value="₦100M-₦1B">₦100M-₦1B</option>
                            <option value="Over ₦1B">Over ₦1B</option>
                        </select>
                    </div>
                </div>

                {/* Financial Documents */}
                <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="col-span-full">
                        <Label className="text-gray-700 font-semibold mb-2 block">Audited Financial Statements</Label>
                    </div>

                    {financialDoc && (
                        <DocumentItem
                            doc={financialDoc}
                            status={getUploadedDoc(financialDoc.id)}
                            onUpload={(file) => onUpload(financialDoc.id, financialDoc.category, financialDoc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(financialDoc.id)}
                        />
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-green hover:bg-green-700 text-white"
                >
                    {isLoading ? "Saving..." : "Save Section"}
                </Button>
            </div>
        </form>
    );
}
