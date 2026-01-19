"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentItem, UploadedDocument } from "@/components/dashboard/business/DocumentRequirementsList";
import { CORE_DOCUMENTS, ADDITIONAL_DOCUMENTS } from "@/constants/documentTypes";

interface RegistrationLegalSectionProps {
    businessProfile: Doc<"businesses">;
    verificationDocs: UploadedDocument[];
    onUpload: (docType: string, category: string, uploadFormats?: string[]) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    uploadingDocs: Set<string>;
}

export function RegistrationLegalSection({
    businessProfile,
    verificationDocs,
    onUpload,
    onDelete,
    onView,
    uploadingDocs
}: RegistrationLegalSectionProps) {
    const { toast } = useToast();
    const updateRegistrationLegal = useMutation(api.businessProfile.updateRegistrationLegal);
    const [isLoading, setIsLoading] = useState(false);

    // Helpers to find docs
    const getDocReq = (id: string) =>
        CORE_DOCUMENTS.find(d => d.id === id) ||
        ADDITIONAL_DOCUMENTS.find(d => d.id === id);

    const getUploadedDoc = (id: string) =>
        verificationDocs.find(d => d.documentType === id);


    const cacCertDoc = getDocReq("CAC_CERTIFICATE");
    const cacForm11Doc = getDocReq("FORM_CAC_1_1");
    const mematDoc = getDocReq("MEMAT");
    const tinCertDoc = getDocReq("TIN_CERTIFICATE");
    const taxClearanceDoc = getDocReq("TAX_CLEARANCE");

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            await updateRegistrationLegal({
                businessId: businessProfile._id,
                registrationNumber: formData.get("cacNumber") as string,
                cacRegistrationDate: formData.get("cacDate") as string || undefined,
                tinNumber: formData.get("tinNumber") as string || undefined,
                companyType: formData.get("companyType") as string || undefined,
                yearEstablished: formData.get("yearEstablished") ? parseInt(formData.get("yearEstablished") as string) : undefined,
            });

            toast({
                title: "Success",
                description: "Registration and legal information updated successfully",
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
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Registration & Legal</h2>
                <p className="text-sm text-gray-500 mt-2">Provide your business registration and legal information for verification</p>
            </div>

            {/* CAC Registration */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="cacNumber">CAC Registration Number *</Label>
                        <div className="relative">
                            <Input
                                id="cacNumber"
                                name="cacNumber"
                                defaultValue={businessProfile.registrationNumber}
                                placeholder="RC123456"
                                required
                            />
                            {businessProfile.verificationStatus === "verified" && (
                                <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-3" />
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cacDate">CAC Registration Date *</Label>
                        <Input
                            id="cacDate"
                            name="cacDate"
                            type="date"
                            defaultValue={businessProfile.cacRegistrationDate || ""}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyType">Company Type *</Label>
                        <select
                            id="companyType"
                            name="companyType"
                            defaultValue={businessProfile.companyType || ""}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            required
                        >
                            <option value="">Select company type</option>
                            <option value="Sole Proprietorship">Sole Proprietorship/Business Name</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Private Limited Company">Private Limited Company (LLC)</option>
                            <option value="Public Limited Company">Public Limited Company (PLC)</option>
                            <option value="NGO">NGO/Non-Profit</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yearEstablished">Year Established</Label>
                        <Input
                            id="yearEstablished"
                            name="yearEstablished"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            defaultValue={businessProfile.yearEstablished || ""}
                            placeholder={new Date().getFullYear().toString()}
                        />
                    </div>
                </div>

                {/* CAC Documents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="col-span-full">
                        <Label className="text-gray-700 font-semibold mb-2 block">CAC Documents</Label>
                        <p className="text-xs text-gray-500 mb-4">Please upload your CAC certificate and related forms.</p>
                    </div>

                    {cacCertDoc && (
                        <DocumentItem
                            doc={cacCertDoc}
                            status={getUploadedDoc(cacCertDoc.id)}
                            onUpload={(file) => onUpload(cacCertDoc.id, cacCertDoc.category, cacCertDoc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(cacCertDoc.id)}
                        />
                    )}

                    {cacForm11Doc && (
                        <DocumentItem
                            doc={cacForm11Doc}
                            status={getUploadedDoc(cacForm11Doc.id)}
                            onUpload={(file) => onUpload(cacForm11Doc.id, cacForm11Doc.category, cacForm11Doc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(cacForm11Doc.id)}
                        />
                    )}

                    {mematDoc && (
                        <div className="col-span-full mt-2">
                            <DocumentItem
                                doc={mematDoc}
                                status={getUploadedDoc(mematDoc.id)}
                                onUpload={(file) => onUpload(mematDoc.id, mematDoc.category, mematDoc.uploadFormats)}
                                onDelete={onDelete}
                                onView={onView}
                                isUploading={uploadingDocs.has(mematDoc.id)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* TIN & Taxes */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="tinNumber">TIN Number *</Label>
                        <div className="relative">
                            <Input
                                id="tinNumber"
                                name="tinNumber"
                                defaultValue={businessProfile.tinNumber || ""}
                                placeholder="12345678-0001"
                            />
                        </div>
                    </div>
                </div>

                {/* Tax Documents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="col-span-full">
                        <Label className="text-gray-700 font-semibold mb-2 block">Tax Documents</Label>
                    </div>

                    {tinCertDoc && (
                        <DocumentItem
                            doc={tinCertDoc}
                            status={getUploadedDoc(tinCertDoc.id)}
                            onUpload={(file) => onUpload(tinCertDoc.id, tinCertDoc.category, tinCertDoc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(tinCertDoc.id)}
                        />
                    )}

                    {taxClearanceDoc && (
                        <DocumentItem
                            doc={taxClearanceDoc}
                            status={getUploadedDoc(taxClearanceDoc.id)}
                            onUpload={(file) => onUpload(taxClearanceDoc.id, taxClearanceDoc.category, taxClearanceDoc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(taxClearanceDoc.id)}
                        />
                    )}
                </div>
            </div>

            {/* Verification Status */}
            {businessProfile.verificationStatus === "verified" && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Verification Status</h3>
                    </div>
                    <p className="text-sm text-green-700">Your business registration has been verified by PEBEC BizLink</p>
                </div>
            )}

            {/* Action Buttons */}
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
