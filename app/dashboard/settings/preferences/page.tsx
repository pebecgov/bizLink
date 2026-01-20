"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SECTORS } from "@/components/onboarding/constants/sectors";
import { Settings, Save, X, Check } from "lucide-react";

const REGIONS = [
    "North-West",
    "North-East",
    "North-Central",
    "South-West",
    "South-East",
    "South-South",
    "All Regions",
];

const CAPITAL_RANGES = [
    { value: "1k-10k", label: "$1K - $10K" },
    { value: "10k-50k", label: "$10K - $50K" },
    { value: "50k-200k", label: "$50K - $200K" },
    { value: "200k+", label: "$200K+" },
];

const RISK_LEVELS = [
    { value: "low", label: "Low Risk", description: "Established businesses, stable returns" },
    { value: "medium", label: "Medium Risk", description: "Growth stage, balanced risk-reward" },
    { value: "high", label: "High Risk", description: "Startups, high growth potential" },
];

export default function InvestorPreferencesPage() {
    const profile = useQuery(api.onboarding.getInvestorProfile);
    const updateProfile = useMutation(api.onboarding.updateInvestorProfile);

    const [sectors, setSectors] = useState<string[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [capitalRange, setCapitalRange] = useState("");
    const [riskAppetite, setRiskAppetite] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Load current profile data
    useEffect(() => {
        if (profile) {
            setSectors(profile.sectors || []);
            setRegions(profile.regions || []);
            setCapitalRange(profile.capitalRange || "10k-50k");
            setRiskAppetite(profile.riskAppetite || "medium");
        }
    }, [profile]);

    const toggleSector = (sectorName: string) => {
        setSectors(prev =>
            prev.includes(sectorName)
                ? prev.filter(s => s !== sectorName)
                : [...prev, sectorName]
        );
        setSaved(false);
    };

    const toggleRegion = (region: string) => {
        if (region === "All Regions") {
            setRegions(prev => prev.includes("All Regions") ? [] : ["All Regions"]);
        } else {
            setRegions(prev => {
                const filtered = prev.filter(r => r !== "All Regions");
                return filtered.includes(region)
                    ? filtered.filter(r => r !== region)
                    : [...filtered, region];
            });
        }
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile({
                sectors,
                regions,
                capitalRange,
                riskAppetite,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Failed to save preferences");
        }
        setSaving(false);
    };

    if (profile === undefined) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (profile === null) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">No Investor Profile Found</h1>
                <p className="text-gray-600">Please complete the investor onboarding first.</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8 text-green-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Investment Preferences</h1>
                        <p className="text-gray-600">Update your matching criteria</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${saved
                            ? "bg-green-100 text-green-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                >
                    {saving ? (
                        <>Saving...</>
                    ) : saved ? (
                        <>
                            <Check className="w-5 h-5" />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            {/* Sectors */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Interested Sectors</h2>
                <p className="text-sm text-gray-600 mb-4">Select the industries you want to invest in</p>

                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
                    {SECTORS.map((sector) => (
                        <button
                            key={sector.name}
                            type="button"
                            onClick={() => toggleSector(sector.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 select-none
                                ${sectors.includes(sector.name)
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent shadow-md hover:shadow-lg hover:scale-105'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-gray-800'
                                }`}
                        >
                            {sectors.includes(sector.name) && <span className="mr-1.5">✓</span>}
                            {sector.name}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">{sectors.length} sector(s) selected</p>
            </div>

            {/* Regions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Target Regions</h2>
                <p className="text-sm text-gray-600 mb-4">Which regions of Nigeria are you interested in?</p>

                <div className="flex flex-wrap gap-2">
                    {REGIONS.map((region) => (
                        <button
                            key={region}
                            type="button"
                            onClick={() => toggleRegion(region)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 select-none
                                ${regions.includes(region)
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            {regions.includes(region) && <span className="mr-1.5">✓</span>}
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            {/* Capital Range */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Investment Capital Range</h2>
                <p className="text-sm text-gray-600 mb-4">How much are you looking to invest?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CAPITAL_RANGES.map((range) => (
                        <button
                            key={range.value}
                            type="button"
                            onClick={() => { setCapitalRange(range.value); setSaved(false); }}
                            className={`p-4 rounded-xl text-center transition-all duration-200 border-2
                                ${capitalRange === range.value
                                    ? 'bg-green-50 border-green-500 text-green-700'
                                    : 'bg-white border-gray-200 hover:border-green-300'
                                }`}
                        >
                            <span className="font-bold">{range.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Risk Appetite */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Risk Appetite</h2>
                <p className="text-sm text-gray-600 mb-4">What level of risk are you comfortable with?</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {RISK_LEVELS.map((risk) => (
                        <button
                            key={risk.value}
                            type="button"
                            onClick={() => { setRiskAppetite(risk.value); setSaved(false); }}
                            className={`p-4 rounded-xl text-left transition-all duration-200 border-2
                                ${riskAppetite === risk.value
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-white border-gray-200 hover:border-green-300'
                                }`}
                        >
                            <div className="font-bold text-gray-900">{risk.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{risk.description}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
