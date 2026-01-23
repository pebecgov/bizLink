"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Globe, Plus, X, Lock, Sparkles } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { NIGERIAN_STATES } from "@/components/onboarding/constants/locations";

export function LocationContactSection() {
    const { toast } = useToast();
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);
    const updateContactInfo = useMutation(api.businessProfile.updateContactInfo);
    const addBranch = useMutation(api.businessProfile.addBranch);
    const removeBranch = useMutation(api.businessProfile.removeBranch);

    const [isLoading, setIsLoading] = useState(false);
    const [newBranch, setNewBranch] = useState({ name: "", address: "", phone: "" });

    // Location state
    const [selectedCountry, setSelectedCountry] = useState("Nigeria");
    const [selectedState, setSelectedState] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [selectedLga, setSelectedLga] = useState("");
    const [availableLgas, setAvailableLgas] = useState<string[]>([]);

    useEffect(() => {
        if (businessProfile) {
            setSelectedCountry(businessProfile.headOfficeAddress?.country || "Nigeria");
            setSelectedState(businessProfile.state || "");
            setCityInput(businessProfile.headOfficeAddress?.city || "");
            setSelectedLga(businessProfile.lga || "");
        }
    }, [businessProfile]);

    useEffect(() => {
        if (selectedCountry === "Nigeria" && selectedState) {
            const stateData = NIGERIAN_STATES.find(s => s.name === selectedState);
            setAvailableLgas(stateData?.lgas || []);
        } else {
            setAvailableLgas([]);
        }
    }, [selectedCountry, selectedState]);

    const handleAddBranch = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!newBranch.name || !newBranch.address) {
            toast({ title: "Error", description: "Name and Address are required", variant: "destructive" });
            return;
        }

        if (!businessProfile) return;

        try {
            await addBranch({
                businessId: businessProfile._id,
                branch: newBranch
            });
            setNewBranch({ name: "", address: "", phone: "" });
            toast({ title: "Success", description: "Branch added successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to add branch", variant: "destructive" });
        }
    };

    // Loading state
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
        if (!businessProfile) return;
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            await updateContactInfo({
                businessId: businessProfile._id,
                contactPhone: formData.get("primaryPhone") as string,
                primaryEmail: formData.get("primaryEmail") as string,
                website: formData.get("website") as string || undefined,
                headOfficeAddress: {
                    street: formData.get("street") as string,
                    city: cityInput, // Use separate city input
                    state: selectedState, // Use state from state variable
                    country: selectedCountry,
                    postalCode: formData.get("postalCode") as string || undefined,
                    lga: selectedLga, // Pass LGA separately
                },
                socialMedia: {
                    linkedin: formData.get("linkedin") as string || undefined,
                    twitter: formData.get("twitter") as string || undefined,
                    facebook: formData.get("facebook") as string || undefined,
                    instagram: formData.get("instagram") as string || undefined,
                    tiktok: formData.get("tiktok") as string || undefined,
                },
            });

            toast({
                title: "Success",
                description: "Location and contact information updated successfully",
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

    const handleRemoveBranch = async (index: number) => {
        if (!businessProfile) return;
        try {
            await removeBranch({
                businessId: businessProfile._id,
                branchIndex: index,
            });
            toast({
                title: "Success",
                description: "Branch removed successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to remove branch",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Location & Contact</h2>
                <p className="text-sm text-gray-500 mt-2">Provide your business location and contact information</p>
            </div>

            {/* Head Office Address */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Head Office Address *
                </h3>

                {/* Country */}
                <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <select
                        id="country"
                        name="country"
                        value={selectedCountry}
                        onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            setSelectedState("");
                            setSelectedLga("");
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        required
                    >
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* State & LGA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="state">State/Region *</Label>
                        {selectedCountry === "Nigeria" ? (
                            <select
                                id="state"
                                name="state"
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedLga("");
                                }}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                required
                            >
                                <option value="">Select State</option>
                                {NIGERIAN_STATES.map((state) => (
                                    <option key={state.name} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <Input
                                id="state"
                                name="state"
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                placeholder="Enter State/Region"
                                required
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lga">LGA / District *</Label>
                        {selectedCountry === "Nigeria" && availableLgas.length > 0 ? (
                            <select
                                id="lga"
                                name="lga"
                                value={selectedLga}
                                onChange={(e) => setSelectedLga(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                required
                            >
                                <option value="">Select LGA</option>
                                {availableLgas.map((lga) => (
                                    <option key={lga} value={lga}>
                                        {lga}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <Input
                                id="lga"
                                name="lga"
                                value={selectedLga}
                                onChange={(e) => setSelectedLga(e.target.value)}
                                placeholder="Enter LGA/District"
                                required
                            />
                        )}
                    </div>
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            name="city"
                            value={cityInput}
                            onChange={(e) => setCityInput(e.target.value)}
                            placeholder="Enter City"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                            id="postalCode"
                            name="postalCode"
                            defaultValue={businessProfile.headOfficeAddress?.postalCode || ""}
                        />
                    </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                        id="street"
                        name="street"
                        defaultValue={businessProfile.headOfficeAddress?.street || ""}
                        placeholder="123 Business Avenue"
                        required
                    />
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="primaryPhone">Primary Phone *</Label>
                        <div className="relative">
                            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                            <Input
                                id="primaryPhone"
                                name="primaryPhone"
                                defaultValue={businessProfile.contactPhone}
                                className="pl-10"
                                placeholder="+234 801 234 5678"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="primaryEmail">Primary Email *</Label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                            <Input
                                id="primaryEmail"
                                name="primaryEmail"
                                type="email"
                                defaultValue={businessProfile.primaryEmail || ""}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                        <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <Input
                            id="website"
                            name="website"
                            defaultValue={businessProfile.website || ""}
                            className="pl-10"
                            placeholder="https://www.example.com"
                        />
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Social Media</h3>
                    {businessProfile.plan !== "premium" && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-bold text-white rounded-full shadow-sm">
                            <Sparkles className="w-2 h-2" />
                            PREMIUM
                        </span>
                    )}
                </div>
                <div className="relative group">
                    {businessProfile.plan !== "premium" && (
                        <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 border border-amber-100 rounded-xl">
                            <Lock className="w-8 h-8 text-amber-600 mb-2" />
                            <p className="text-sm font-bold text-gray-900">Premium Branding</p>
                            <p className="text-xs text-gray-600 max-w-[300px] mt-1">Upgrade to link your social media accounts and build trust with international partners.</p>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="mt-4 border-amber-200 text-amber-700 hover:bg-amber-50"
                                onClick={() => toast({ title: "Premium Feature", description: "Upgrade flow coming soon" })}
                            >
                                Unlock Social Links
                            </Button>
                        </div>
                    )}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${businessProfile.plan !== "premium" ? "opacity-40 grayscale-[0.5]" : ""}`}>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                defaultValue={businessProfile.socialMedia?.linkedin || ""}
                                placeholder="https://linkedin.com/company/..."
                                disabled={businessProfile.plan !== "premium"}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                                id="twitter"
                                name="twitter"
                                defaultValue={businessProfile.socialMedia?.twitter || ""}
                                placeholder="https://twitter.com/..."
                                disabled={businessProfile.plan !== "premium"}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                                id="facebook"
                                name="facebook"
                                defaultValue={businessProfile.socialMedia?.facebook || ""}
                                placeholder="https://facebook.com/..."
                                disabled={businessProfile.plan !== "premium"}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                                id="instagram"
                                name="instagram"
                                defaultValue={businessProfile.socialMedia?.instagram || ""}
                                placeholder="https://instagram.com/..."
                                disabled={businessProfile.plan !== "premium"}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok</Label>
                            <Input
                                id="tiktok"
                                name="tiktok"
                                defaultValue={businessProfile.socialMedia?.tiktok || ""}
                                placeholder="https://tiktok.com/@..."
                                disabled={businessProfile.plan !== "premium"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Branches */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Branch Locations</h3>
                </div>

                {/* Add Branch Form */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Add New Branch</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                            placeholder="Branch Name (e.g. Lagos HQ)"
                            value={newBranch.name}
                            onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                        />
                        <Input
                            placeholder="Address"
                            value={newBranch.address}
                            onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                        />
                        <Input
                            placeholder="Phone (Optional)"
                            value={newBranch.phone}
                            onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                        />
                        <Button type="button" onClick={handleAddBranch} variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add Branch
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    {businessProfile.branches && businessProfile.branches.length > 0 ? (
                        businessProfile.branches.map((branch, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{branch.name}</p>
                                    <p className="text-xs text-gray-500">{branch.address}</p>
                                    {branch.phone && <p className="text-xs text-gray-500">{branch.phone}</p>}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBranch(idx)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No branches added yet</p>
                    )}
                </div>
            </div>

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
