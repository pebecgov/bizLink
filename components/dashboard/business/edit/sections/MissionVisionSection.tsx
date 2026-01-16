"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function MissionVisionSection() {
    const { toast } = useToast();
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);
    const updateMissionVision = useMutation(api.businessProfile.updateMissionVision);
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
                    <p className="text-gray-500">No business profile found.</p>
                </div>
            </div>
        );
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            await updateMissionVision({
                businessId: businessProfile._id,
                missionStatement: formData.get("missionStatement") as string || undefined,
                visionStatement: formData.get("visionStatement") as string || undefined,
            });

            toast({
                title: "Success",
                description: "Mission and vision updated successfully",
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
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Mission & Vision</h2>
                <p className="text-sm text-gray-500 mt-2">Define your company&apos;s purpose and future aspirations</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="missionStatement">Mission Statement *</Label>
                <Textarea
                    id="missionStatement"
                    name="missionStatement"
                    defaultValue={businessProfile.missionStatement || ""}
                    className="min-h-[150px]"
                    placeholder="Describe your company's purpose and core objectives..."
                    required
                />
                <p className="text-xs text-gray-500">What does your company do and why does it exist?</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="visionStatement">Vision Statement *</Label>
                <Textarea
                    id="visionStatement"
                    name="visionStatement"
                    defaultValue={businessProfile.visionStatement || ""}
                    className="min-h-[150px]"
                    placeholder="Describe your company's long-term aspirations..."
                    required
                />
                <p className="text-xs text-gray-500">Where do you see your company in the future?</p>
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
