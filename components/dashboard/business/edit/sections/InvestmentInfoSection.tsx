"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentItem, UploadedDocument } from "@/components/dashboard/business/DocumentRequirementsList";
import { CORE_DOCUMENTS, ADDITIONAL_DOCUMENTS } from "@/constants/documentTypes";

interface InvestmentInfoSectionProps {
    businessProfile: Doc<"businesses">;
    verificationDocs: UploadedDocument[];
    onUpload: (docType: string, category: string, uploadFormats?: string[]) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    uploadingDocs: Set<string>;
}

export function InvestmentInfoSection({
    businessProfile,
    verificationDocs,
    onUpload,
    onDelete,
    onView,
    uploadingDocs
}: InvestmentInfoSectionProps) {
    const { toast } = useToast();
    const updateInvestmentInfo = useMutation(api.businessProfile.updateInvestmentInfo);
    const [isLoading, setIsLoading] = useState(false);

    // BUSINESS_PLAN
    const businessPlanDoc = CORE_DOCUMENTS.find(d => d.id === "BUSINESS_PLAN");
    const getUploadedDoc = (id: string) => verificationDocs.find(d => d.documentType === id);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            await updateInvestmentInfo({
                businessId: businessProfile._id,
                seekingFunding: formData.get("seekingFunding") === "yes",
                fundingAmount: formData.get("fundingAmount") as string || undefined,
                equityOffered: formData.get("equityOffered") as string || undefined,
                useOfFunds: formData.get("useOfFunds") as string || undefined,
            });

            toast({ title: "Success", description: "Investment information updated successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to update information", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Investment Information</h2>
                <p className="text-sm text-gray-500 mt-2">Provide details about your funding needs and upload your pitch deck/business plan.</p>
            </div>

            <div className="space-y-4">
                <Label>Are you seeking funding?</Label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="seekingFunding" value="yes" defaultChecked={businessProfile.seekingFunding} />
                        <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="seekingFunding" value="no" defaultChecked={!businessProfile.seekingFunding} />
                        <span>No</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fundingAmount">Funding Amount</Label>
                    <Input id="fundingAmount" name="fundingAmount" defaultValue={businessProfile.fundingAmount || ""} placeholder="e.g., $500,000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="equityOffered">Equity Offered</Label>
                    <Input id="equityOffered" name="equityOffered" defaultValue={businessProfile.equityOffered || ""} placeholder="e.g., 15%" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="useOfFunds">Use of Funds</Label>
                <Textarea id="useOfFunds" name="useOfFunds" defaultValue={businessProfile.useOfFunds || ""} className="min-h-[100px]" />
            </div>

            {/* Investment Documents */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="col-span-full">
                    <Label className="text-gray-700 font-semibold mb-2 block">Investment Deck / Business Plan</Label>
                </div>

                {businessPlanDoc && (
                    <DocumentItem
                        doc={businessPlanDoc}
                        status={getUploadedDoc(businessPlanDoc.id)}
                        onUpload={(file) => onUpload(businessPlanDoc.id, businessPlanDoc.category, businessPlanDoc.uploadFormats)}
                        onDelete={onDelete}
                        onView={onView}
                        isUploading={uploadingDocs.has(businessPlanDoc.id)}
                    />
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="submit" disabled={isLoading} className="bg-primary-green hover:bg-green-700 text-white">
                    {isLoading ? "Saving..." : "Save Section"}
                </Button>
            </div>
        </form>
    );
}
