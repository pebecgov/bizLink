import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, X } from "lucide-react";

interface BusinessProfileProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

export function BusinessProfile({ onNext, onBack, initialData = {} }: BusinessProfileProps) {
    const [formData, setFormData] = useState({
        businessName: initialData.businessName || "",
        registrationNumber: initialData.registrationNumber || "",
        contactName: initialData.contactName || "",
        contactPhone: initialData.contactPhone || "",
    });

    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Handle NIN Verification Logic
        if (name === "registrationNumber") {
            // Only allow numbers and max 11 digits
            const numericValue = value.replace(/\D/g, "").slice(0, 11);
            setFormData((prev) => ({ ...prev, [name]: numericValue }));

            if (numericValue.length === 11 && !isVerified) {
                verifyNIN(numericValue);
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear error when typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const verifyNIN = async (nin: string) => {
        setIsVerifying(true);

        // Simulate API verification delay
        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
            setFormData(prev => ({
                ...prev,
                contactName: "Abdullahi Bashir",
                contactPhone: "08160192779"
            }));
        }, 2500);
    };

    const resetVerification = () => {
        setIsVerified(false);
        setFormData(prev => ({
            ...prev,
            registrationNumber: "",
            contactName: "",
            contactPhone: ""
        }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.businessName) newErrors.businessName = "Business name is required";
        if (!formData.registrationNumber) newErrors.registrationNumber = "NIN number is required";
        if (formData.registrationNumber.length !== 11) newErrors.registrationNumber = "NIN must be 11 digits";
        if (!isVerified) newErrors.registrationNumber = "Please wait for NIN verification";

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
                <h2 className="text-3xl font-bold text-gray-800">Business Details</h2>
                <p className="text-gray-500 mt-2">
                    Enter your NIN to automatically fetch your details.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm">

                <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-semibold text-gray-700 ml-1">Business Name</label>
                    <input
                        id="businessName"
                        name="businessName"
                        placeholder="e.g. Acme Corp"
                        value={formData.businessName}
                        onChange={handleChange}
                        className={`flex h-12 w-full rounded-xl border ${errors.businessName ? "border-red-500" : "border-gray-200"} bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200`}
                    />
                    {errors.businessName && <p className="text-xs text-red-500 ml-1">{errors.businessName}</p>}
                </div>

                {/* NIN Input - Moved to top as primary identifier */}
                <div className="space-y-2">
                    <label htmlFor="registrationNumber" className="text-sm font-semibold text-gray-700 ml-1">NIN Number</label>
                    <div className="relative">
                        <input
                            id="registrationNumber"
                            name="registrationNumber"
                            placeholder="Enter 11-digit NIN"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            disabled={isVerifying || isVerified}
                            className={`flex h-12 w-full rounded-xl border ${errors.registrationNumber ? "border-red-500" : "border-gray-200"} bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 ${isVerified ? "bg-green-50 text-green-900 border-green-200 pr-10" : ""}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {isVerifying && <Loader2 className="w-5 h-5 animate-spin text-green-600" />}
                            {isVerified && (
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <button
                                        type="button"
                                        onClick={resetVerification}
                                        className="p-1 hover:bg-red-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                        title="Reset Verification"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {errors.registrationNumber && <p className="text-xs text-red-500 ml-1">{errors.registrationNumber}</p>}
                    {isVerified && <p className="text-xs text-green-600 ml-1 font-medium">Verification Successful</p>}
                </div>

                {/* Auto-filled Fields */}
                <div className={`space-y-6 transition-all duration-500 ${isVerified ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="contactName" className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                            <input
                                id="contactName"
                                name="contactName"
                                value={formData.contactName}
                                readOnly
                                className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="contactPhone" className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                            <input
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                readOnly
                                className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>




                <div className="flex gap-4 pt-6">
                    <button type="button" onClick={onBack} className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 border border-gray-200 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm">
                        Back
                    </button>
                    <button type="submit" disabled={!isVerified} className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Next Step
                    </button>
                </div>
            </form>
        </div>
    );
}
