"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, Shield, CheckCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface FundingPreferencesModalProps {
    businessId: Id<"businesses">;
    onClose: () => void;
    currentPercentage?: number;
}

export function FundingPreferencesModal({
    businessId,
    onClose,
    currentPercentage = 0,
}: FundingPreferencesModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const updateFundingPreferences = useMutation(api.verificationScore.updateFundingPreferences);

    const handleSelection = async (seeking: boolean) => {
        setIsSubmitting(true);
        try {
            await updateFundingPreferences({
                businessId,
                seekingFunding: seeking,
            });
            onClose();
        } catch (error) {
            console.error("Failed to update funding preferences:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-green to-green-600 text-white p-6 rounded-t-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Welcome to BizLink!</h2>
                        <p className="text-green-50">Let's understand your funding needs</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Question */}
                    <div className="text-center py-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Are you looking for funding?
                        </h3>
                        <p className="text-gray-600">
                            This helps us tailor your experience and connect you with the right investors
                        </p>
                    </div>

                    {/* Verification Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                        <div className="flex items-start gap-3">
                            <Shield className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-2">
                                    To receive investments, you'll need to complete verification
                                </h4>
                                <div className="space-y-2 text-sm text-blue-800">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <p>
                                            <strong>75% verification minimum</strong> required to unlock investment features
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <p>
                                            Upload <strong>8 core documents</strong> (CAC Certificate, TIN, Tax Clearance, Business Plan, etc.)
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <p>
                                            Additional <strong>sector-specific documents</strong> may be required
                                        </p>
                                    </div>
                                </div>
                                {currentPercentage > 0 && (
                                    <div className="mt-3 pt-3 border-t border-blue-200">
                                        <p className="text-sm text-blue-700">
                                            Your current verification: <strong>{currentPercentage}%</strong>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <Button
                            onClick={() => handleSelection(true)}
                            disabled={isSubmitting}
                            className="bg-primary-green hover:bg-green-700 text-white h-auto py-4 rounded-xl"
                        >
                            <div className="text-center">
                                <p className="font-bold text-lg">Yes, I'm Seeking Funding</p>
                                <p className="text-xs text-green-100 mt-1">
                                    I want to connect with investors
                                </p>
                            </div>
                        </Button>

                        <Button
                            onClick={() => handleSelection(false)}
                            disabled={isSubmitting}
                            variant="outline"
                            className="border-2 h-auto py-4 rounded-xl hover:bg-gray-50"
                        >
                            <div className="text-center">
                                <p className="font-bold text-lg">Not Right Now</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    I'll explore the platform first
                                </p>
                            </div>
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <p className="text-xs text-center text-gray-500">
                        You can change this preference anytime in your business profile settings
                    </p>
                </div>
            </div>
        </div>
    );
}
