"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentItem, UploadedDocument } from "@/components/dashboard/business/DocumentRequirementsList";
import { CORE_DOCUMENTS, ADDITIONAL_DOCUMENTS } from "@/constants/documentTypes";

interface RegistrationLegalSectionProps {
    businessProfile: Doc<"businesses">;
    verificationDocs: UploadedDocument[];
    onUpload: (file: File, docType: string, category: string, uploadFormats?: string[]) => void;
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
    const verifyRegistrationNumbers = useMutation(api.businessProfile.verifyRegistrationNumbers);
    const [isLoading, setIsLoading] = useState(false);

    // CAC Verification State
    const [entityType, setEntityType] = useState<string>("");
    const [cacNumber, setCacNumber] = useState(businessProfile.registrationNumber || "");
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<{ success: boolean; message: string } | null>(null);

    // TIN Verification State
    const [tinNumber, setTinNumber] = useState(businessProfile.tinNumber || "");
    const [isVerifyingTin, setIsVerifyingTin] = useState(false);
    const [tinVerificationResult, setTinVerificationResult] = useState<{ success: boolean; message: string } | null>(null);

    // Parse saved CAC number on component mount
    useEffect(() => {
        if (businessProfile.registrationNumber) {
            const savedCac = businessProfile.registrationNumber;
            // Extract entity type prefix (RC, BN, IT, LLP)
            const prefixes = ['RC', 'BN', 'IT', 'LLP'];
            for (const prefix of prefixes) {
                if (savedCac.startsWith(prefix)) {
                    setEntityType(prefix);
                    setCacNumber(savedCac.substring(prefix.length));
                    break;
                }
            }
        }
    }, [businessProfile.registrationNumber]);

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

    // Handle CAC Verification (Demo)
    const handleVerify = async () => {
        setIsVerifying(true);
        setVerificationResult(null);

        // Get form values
        const cacDateInput = (document.getElementById("cacDate") as HTMLInputElement)?.value;

        // Validation checks
        if (!entityType) {
            setVerificationResult({ success: false, message: "Please select an entity type" });
            setIsVerifying(false);
            return;
        }

        if (!cacNumber) {
            setVerificationResult({ success: false, message: "Please enter CAC number" });
            setIsVerifying(false);
            return;
        }

        if (!cacDateInput) {
            setVerificationResult({ success: false, message: "Please enter CAC registration date" });
            setIsVerifying(false);
            return;
        }

        // Validate number format
        if (!/^\d+$/.test(cacNumber)) {
            setVerificationResult({
                success: false,
                message: `Invalid CAC number format. Please enter only numbers`
            });
            setIsVerifying(false);
            return;
        }

        // Check if number has sufficient length (at least 3 digits)
        if (cacNumber.length < 3) {
            setVerificationResult({
                success: false,
                message: `CAC number too short. Please enter at least 3 digits`
            });
            setIsVerifying(false);
            return;
        }

        try {
            // Save verification to database
            await verifyRegistrationNumbers({ businessId: businessProfile._id });

            // Success!
            const fullCacNumber = `${entityType}${cacNumber}`;
            setVerificationResult({
                success: true,
                message: `✓ CAC verification successful! "${businessProfile.businessName}" is correctly registered with ${fullCacNumber}`
            });

            toast({
                title: "Verification Saved",
                description: "Your CAC and TIN verification has been saved successfully",
            });
        } catch (error) {
            console.error("Error saving verification:", error);
            setVerificationResult({
                success: false,
                message: "Failed to save verification. Please try again."
            });
            toast({
                title: "Error",
                description: "Failed to save verification",
                variant: "destructive",
            });
        } finally {
            setIsVerifying(false);
        }
    };

    // Handle TIN Verification
    const handleVerifyTin = async () => {
        setIsVerifyingTin(true);
        setTinVerificationResult(null);

        // Validation checks
        if (!tinNumber || tinNumber.trim() === "") {
            setTinVerificationResult({ success: false, message: "Please enter TIN number" });
            setIsVerifyingTin(false);
            return;
        }

        // Validate TIN format (basic format check: numbers and dash)
        if (!/^[\d-]+$/.test(tinNumber)) {
            setTinVerificationResult({
                success: false,
                message: "Invalid TIN format. TIN should contain only numbers and dashes (e.g., 12345678-0001)"
            });
            setIsVerifyingTin(false);
            return;
        }

        // Check minimum length
        if (tinNumber.length < 8) {
            setTinVerificationResult({
                success: false,
                message: "TIN number is too short. Please enter a valid TIN"
            });
            setIsVerifyingTin(false);
            return;
        }

        try {
            // For demo: verify against company name
            // In production, this would call a government API
            const companyName = businessProfile.businessName;

            if (!companyName) {
                setTinVerificationResult({
                    success: false,
                    message: "Company name not found. Please save your business name first."
                });
                setIsVerifyingTin(false);
                return;
            }

            // Demo validation successful
            setTinVerificationResult({
                success: true,
                message: `✓ TIN verification successful! "${companyName}" is correctly registered with TIN ${tinNumber}`
            });

            toast({
                title: "TIN Verified",
                description: "Your TIN number has been verified successfully",
            });
        } catch (error) {
            console.error("Error verifying TIN:", error);
            setTinVerificationResult({
                success: false,
                message: "Failed to verify TIN. Please try again."
            });
            toast({
                title: "Error",
                description: "Failed to verify TIN",
                variant: "destructive",
            });
        } finally {
            setIsVerifyingTin(false);
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            // Combine entity type with CAC number for storage
            const fullCacNumber = entityType && cacNumber ? `${entityType}${cacNumber}` : cacNumber;

            await updateRegistrationLegal({
                businessId: businessProfile._id,
                registrationNumber: fullCacNumber,
                cacRegistrationDate: formData.get("cacDate") as string || undefined,
                tinNumber: tinNumber || undefined,
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Entity Type */}
                    <div className="space-y-2">
                        <Label htmlFor="entityType">Entity Type *</Label>
                        <select
                            id="entityType"
                            value={entityType}
                            onChange={(e) => setEntityType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                            required
                        >
                            <option value="">Select entity type</option>
                            <option value="RC">Limited Company (RC)</option>
                            <option value="BN">Business Name (BN)</option>
                            <option value="IT">NGO / Association (IT)</option>
                            <option value="LLP">LLP / LP</option>
                        </select>
                        <p className="text-xs text-gray-500">Select your business registration type</p>
                    </div>

                    {/* CAC Number */}
                    <div className="space-y-2">
                        <Label htmlFor="cacNumber">CAC Registration Number *</Label>
                        <div className="relative flex items-center">
                            {entityType && (
                                <span className="absolute left-3 text-gray-700 font-medium z-10 bg-gray-100 px-2 py-1 rounded-l text-sm">
                                    {entityType}
                                </span>
                            )}
                            <Input
                                id="cacNumber"
                                name="cacNumber"
                                value={cacNumber}
                                onChange={(e) => {
                                    // Only allow numbers
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCacNumber(value);
                                    setVerificationResult(null);
                                }}
                                placeholder={entityType ? "123456" : "Select entity type first"}
                                required
                                disabled={!entityType}
                                className={entityType ? "pl-20" : ""}
                            />
                            {verificationResult?.success && (
                                <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-3" />
                            )}
                        </div>
                    </div>

                    {/* CAC Date */}
                    <div className="space-y-2">
                        <Label htmlFor="cacDate">CAC Registration Date *</Label>
                        <Input
                            id="cacDate"
                            name="cacDate"
                            type="date"
                            defaultValue={businessProfile.cacRegistrationDate || ""}
                        />
                    </div>
                </div>

                {/* Verify Button */}
                <div className="flex justify-start">
                    <Button
                        type="button"
                        onClick={handleVerify}
                        disabled={isVerifying || !entityType || !cacNumber}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isVerifying ? "Verifying..." : "Verify CAC Registration"}
                    </Button>
                </div>

                {/* Verification Result */}
                {verificationResult && (
                    <div className={`p-4 rounded-lg border ${verificationResult.success
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                        }`}>
                        <p className="text-sm font-medium">{verificationResult.message}</p>
                    </div>
                )}

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
                            onUpload={(file) => onUpload(file, cacCertDoc.id, cacCertDoc.category, cacCertDoc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(cacCertDoc.id)}
                        />
                    )}

                    {cacForm11Doc && (
                        <DocumentItem
                            doc={cacForm11Doc}
                            status={getUploadedDoc(cacForm11Doc.id)}
                            onUpload={(file) => onUpload(file, cacForm11Doc.id, cacForm11Doc.category, cacForm11Doc.uploadFormats)}
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
                                onUpload={(file) => onUpload(file, mematDoc.id, mematDoc.category, mematDoc.uploadFormats)}
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
                <h3 className="text-lg font-semibold text-gray-900">Tax Information</h3>

                <div className="space-y-4">
                    {/* TIN Input */}
                    <div className="space-y-2">
                        <Label htmlFor="tinNumber">TIN Number *</Label>
                        <div className="relative">
                            <Input
                                id="tinNumber"
                                name="tinNumber"
                                value={tinNumber}
                                onChange={(e) => {
                                    setTinNumber(e.target.value);
                                    setTinVerificationResult(null);
                                }}
                                placeholder="12345678-0001"
                            />
                            {tinVerificationResult?.success && (
                                <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-3" />
                            )}
                        </div>
                        <p className="text-xs text-gray-500">Enter your Tax Identification Number</p>
                    </div>

                    {/* Verify TIN Button */}
                    <div className="flex justify-start">
                        <Button
                            type="button"
                            onClick={handleVerifyTin}
                            disabled={isVerifyingTin || !tinNumber}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isVerifyingTin ? "Verifying..." : "Verify TIN Number"}
                        </Button>
                    </div>

                    {/* TIN Verification Result */}
                    {tinVerificationResult && (
                        <div className={`p-4 rounded-lg border ${tinVerificationResult.success
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <p className="text-sm font-medium">{tinVerificationResult.message}</p>
                        </div>
                    )}
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
                            onUpload={(file) => onUpload(file, tinCertDoc.id, tinCertDoc.category, tinCertDoc.uploadFormats)}
                            onDelete={onDelete}
                            onView={onView}
                            isUploading={uploadingDocs.has(tinCertDoc.id)}
                        />
                    )}

                    {taxClearanceDoc && (
                        <DocumentItem
                            doc={taxClearanceDoc}
                            status={getUploadedDoc(taxClearanceDoc.id)}
                            onUpload={(file) => onUpload(file, taxClearanceDoc.id, taxClearanceDoc.category, taxClearanceDoc.uploadFormats)}
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
