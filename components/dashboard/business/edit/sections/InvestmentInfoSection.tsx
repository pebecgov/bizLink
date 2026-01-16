"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function InvestmentInfoSection() {
    const { toast } = useToast();
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);
    const updateInvestmentInfo = useMutation(api.businessProfile.updateInvestmentInfo);
    const [isLoading, setIsLoading] = useState(false);

    if (businessProfile === undefined) {
        return <div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (!businessProfile) {
        return <div className="text-center py-12 text-gray-500">No business profile found.</div>;
    }

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
                <p className="text-sm text-gray-500 mt-2">Provide details about your funding needs</p>
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

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="submit" disabled={isLoading} className="bg-primary-green hover:bg-green-700 text-white">
                    {isLoading ? "Saving..." : "Save Section"}
                </Button>
            </div>
        </form>
    );
}
