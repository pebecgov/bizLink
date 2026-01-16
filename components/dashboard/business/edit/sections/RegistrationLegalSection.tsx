"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function RegistrationLegalSection() {
    const { toast } = useToast();
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);
    const updateRegistrationLegal = useMutation(api.businessProfile.updateRegistrationLegal);
    const [isLoading, setIsLoading] = useState(false);

    if (businessProfile === undefined) {
        return (
            <div className="space-y-8 animate-in fade-in">
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!businessProfile) {
        return (
            <div className="space-y-8 animate-in fade-in">
                <div className="text-center py-12">
                    <p className="text-gray-500">No business profile found. Please complete onboarding first.</p>
                </div>
            </div>
        );
    }

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
                    {businessProfile.verificationStatus === "verified" && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified with CAC
                        </p>
                    )}
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
            </div>

            {/* TIN & Company Type */}
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
            </div>

            {/* Year Established */}
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
