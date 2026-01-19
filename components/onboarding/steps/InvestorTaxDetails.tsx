"use client";

import { useState } from "react";

interface InvestorTaxDetailsProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Germany", "France", "Netherlands",
    "Switzerland", "Singapore", "United Arab Emirates", "South Africa", "Kenya",
    "Nigeria", "Ghana", "Egypt", "Morocco", "Australia", "Japan", "China", "India",
    "Brazil", "Mexico", "Other"
].sort();

const TAX_ID_TYPES = [
    "TIN (Tax Identification Number)",
    "VAT (Value Added Tax)",
    "EIN (Employer Identification Number)",
    "Other"
];

export function InvestorTaxDetails({ onNext, onBack, initialData = {} }: InvestorTaxDetailsProps) {
    const [formData, setFormData] = useState({
        taxIdType: initialData.taxIdType || "",
        taxIdentificationNumber: initialData.taxIdentificationNumber || "",
        taxIssuingCountry: initialData.taxIssuingCountry || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.taxIdType || !formData.taxIdentificationNumber || !formData.taxIssuingCountry) {
            alert("Please fill in all required fields");
            return;
        }

        onNext(formData);
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Tax Identification</h2>
                <p className="text-gray-500 mt-2">
                    Provide your tax identification details for compliance purposes.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm">

                {/* Tax Identification Section */}
                <div className="space-y-4">
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="taxIdType" className="text-xs font-medium text-gray-600 ml-1">
                                Tax ID Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <select
                                    id="taxIdType"
                                    value={formData.taxIdType}
                                    onChange={(e) => setFormData(prev => ({ ...prev, taxIdType: e.target.value }))}
                                    className="flex h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select Tax ID Type</option>
                                    {TAX_ID_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="taxIdentificationNumber" className="text-xs font-medium text-gray-600 ml-1">
                                Tax Identification Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="taxIdentificationNumber"
                                value={formData.taxIdentificationNumber}
                                onChange={(e) => setFormData(prev => ({ ...prev, taxIdentificationNumber: e.target.value }))}
                                className="mt-1 flex h-12 w-full rounded-xl border border-gray-200 bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g., GB123456789"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="taxIssuingCountry" className="text-xs font-medium text-gray-600 ml-1">
                                Tax Issuing Country <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1">
                                <select
                                    id="taxIssuingCountry"
                                    value={formData.taxIssuingCountry}
                                    onChange={(e) => setFormData(prev => ({ ...prev, taxIssuingCountry: e.target.value }))}
                                    className="flex h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select Country</option>
                                    {COUNTRIES.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-6">
                    <button type="button" onClick={onBack} className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 border border-gray-200 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm">
                        Back
                    </button>
                    <button type="submit" className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}
