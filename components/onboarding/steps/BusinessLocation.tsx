"use client";

import { useState } from "react";
import StateSelector from "../form/StateSelector";
import SectorSelector from "../form/SectorSelector";

interface BusinessLocationProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

export function BusinessLocation({ onNext, onBack, initialData = {} }: BusinessLocationProps) {
    const [formData, setFormData] = useState({
        state: initialData.state || "",
        lga: initialData.lga || "",
        sector: initialData.sector || "",
        subsector: initialData.subsector || "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSelectorChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when selecting
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.lga) newErrors.lga = "LGA is required";
        if (!formData.sector) newErrors.sector = "Sector is required";
        if (!formData.subsector) newErrors.subsector = "Subsector is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onNext(formData);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Location & Industry</h2>
                <p className="text-gray-500 mt-2">
                    Where are you located and what do you do?
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm">

                <div className="space-y-6">
                    <StateSelector
                        selectedState={formData.state}
                        selectedLGA={formData.lga}
                        onStateChange={(val) => handleSelectorChange("state", val)}
                        onLGAChange={(val) => handleSelectorChange("lga", val)}
                        errorState={errors.state}
                        errorLGA={errors.lga}
                    />

                    <SectorSelector
                        selectedSector={formData.sector}
                        selectedSubsector={formData.subsector}
                        onSectorChange={(val) => handleSelectorChange("sector", val)}
                        onSubsectorChange={(val) => handleSelectorChange("subsector", val)}
                        errorSector={errors.sector}
                        errorSubsector={errors.subsector}
                    />
                </div>

                <div className="flex gap-4 pt-6">
                    <button type="button" onClick={onBack} className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 border border-gray-200 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm">
                        Back
                    </button>
                    <button type="submit" className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Next Step
                    </button>
                </div>
            </form>
        </div>
    );
}
