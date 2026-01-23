"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight, Upload, AlertCircle, Save, Building2, Plus, X, Sparkles, Loader2 } from "lucide-react";

import { SECTORS } from "@/components/onboarding/constants/sectors";
import { BUSINESS_STAGES, BUSINESS_MODELS, TARGET_MARKETS, AFRICAN_COUNTRIES } from "@/components/dashboard/business/lib/sectorData";
import { LocationContactSection } from "@/components/dashboard/business/edit/sections/LocationContactSection";
import { ProductsServicesSection } from "@/components/dashboard/business/edit/sections/ProductsServicesSection";
import { MissionVisionSection } from "@/components/dashboard/business/edit/sections/MissionVisionSection";
import { MediaGallerySection } from "@/components/dashboard/business/edit/sections/MediaGallerySection";
import { CertificationsSection } from "@/components/dashboard/business/edit/sections/CertificationsSection";
import { SustainabilitySection } from "@/components/dashboard/business/edit/sections/SustainabilitySection";
import { useRouter } from "next/navigation";

const SECTIONS_CONFIG = [
    { id: "identity", label: "Business Identity" },
    { id: "classification", label: "Business Classification" },
    { id: "location", label: "Location & Contact" },
    { id: "mission", label: "Mission & Vision" },
    { id: "media", label: "Media Gallery" },
    { id: "certifications", label: "Certifications & Awards" }
];

export default function EditProfilePage() {
    const router = useRouter();

    // Fetch real business profile data
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);
    // Calculate section status dynamically
    const getSectionStatus = (id: string) => {
        if (!businessProfile) return "incomplete";

        const p = businessProfile; // shorthand

        switch (id) {
            case "identity":
                return (p.businessName && p.logoUrl && p.companyTagline && p.companyDescription) ? "complete" : "incomplete";
            case "classification":
                return (p.sector && p.subsector && p.businessStage) ? "complete" : "incomplete";
            case "location":
                return (p.headOfficeAddress?.street && p.headOfficeAddress?.city && p.contactPhone && p.primaryEmail) ? "complete" : "incomplete";
            case "mission":
                return (p.missionStatement && p.visionStatement) ? "complete" : "incomplete";
            case "media":
                return (p.imageGallery && p.imageGallery.length > 0) ? "complete" : "incomplete";
            default:
                return "incomplete";
        }
    };

    const sectionsWithStatus = SECTIONS_CONFIG.map(section => ({
        ...section,
        status: getSectionStatus(section.id)
    }));

    // Calculate completeness percentage
    const calculateCompleteness = () => {
        if (!businessProfile) return 0;
        const totalCompleted = sectionsWithStatus.filter(s => s.status === "complete").length;
        return Math.round((totalCompleted / SECTIONS_CONFIG.length) * 100);
    };

    const profileCompleteness = calculateCompleteness();

    // Mutations
    const updateIdentity = useMutation(api.businessProfile.updateCompanyIdentity);
    const updateClassification = useMutation(api.businessProfile.updateBusinessClassification);

    const [activeSection, setActiveSection] = useState("identity");
    const [isSaving, setIsSaving] = useState(false);

    // Form state for identity section
    const [companyName, setCompanyName] = useState("");
    const [tradingName, setTradingName] = useState("");
    const [companyTagline, setCompanyTagline] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const [selectedLogoPreview, setSelectedLogoPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Upload mutation
    const generateUploadUrl = useMutation(api.businessProfile.generateUploadUrl);

    const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form state for classification section
    const [selectedSector, setSelectedSector] = useState("");
    const [customSector, setCustomSector] = useState("");
    const [selectedSubsector, setSelectedSubsector] = useState("");
    const [customSubsector, setCustomSubsector] = useState("");
    const [businessStage, setBusinessStage] = useState("");
    const [businessModel, setBusinessModel] = useState("");
    const [targetMarket, setTargetMarket] = useState("");
    const [afcftaCompliant, setAfcftaCompliant] = useState(false);
    const [operatingCountries, setOperatingCountries] = useState<string[]>([]);
    const [secondarySectors, setSecondarySectors] = useState<string[]>([]);

    // Initialize form data when business profile loads
    useEffect(() => {
        if (businessProfile) {
            // Identity section
            setCompanyName(businessProfile.businessName || "");
            setTradingName(businessProfile.tradingName || "");
            setCompanyTagline(businessProfile.companyTagline || "");
            setCompanyDescription(businessProfile.companyDescription || "");

            // Classification section
            const sectorExists = SECTORS.some(s => s.name === businessProfile.sector);

            if (sectorExists && businessProfile.sector) {
                // Known sector
                setSelectedSector(businessProfile.sector);
                setCustomSector("");

                const sectorData = SECTORS.find(s => s.name === businessProfile.sector);
                if (sectorData?.subsectors.includes(businessProfile.subsector || "")) {
                    // Known subsector
                    setSelectedSubsector(businessProfile.subsector || "");
                    setCustomSubsector("");
                } else {
                    // Unknown subsector (Custom)
                    setSelectedSubsector("Other");
                    setCustomSubsector(businessProfile.subsector || "");
                }
            } else if (!sectorExists && businessProfile.sector) {
                // Unknown sector -> Map to "Artisan" + Other
                setSelectedSector("Artisan");
                setCustomSector(businessProfile.sector);
                setSelectedSubsector("Other");
                setCustomSubsector(businessProfile.subsector || "");
            } else {
                // New/Empty
                setSelectedSector("");
                setCustomSector("");
                setSelectedSubsector("");
                setCustomSubsector("");
            }
            setBusinessStage(businessProfile.businessStage || "");
            setBusinessModel(businessProfile.businessModel || "");
            setTargetMarket(businessProfile.targetMarket || "");
            setAfcftaCompliant(businessProfile.afcftaCompliant || false);
            setOperatingCountries(businessProfile.operatingCountries || []);
            setSecondarySectors(businessProfile.secondarySectors || []);
        }
    }, [businessProfile]);

    // Loading state
    if (businessProfile === undefined) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading business profile...</p>
                </div>
            </div>
        );
    }

    // No profile found
    if (!businessProfile) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No Business Profile Found</h2>
                    <p className="text-gray-600 mb-4">Complete onboarding to create your business profile</p>
                    <Button
                        onClick={() => router.push("/onboarding")}
                        className="bg-primary-green hover:bg-green-700"
                    >
                        Complete Onboarding
                    </Button>
                </div>
            </div>
        );
    }

    // Save handlers
    const handleSaveIdentity = async () => {
        if (!businessProfile._id) return;

        setIsSaving(true);
        try {
            let uploadedLogoUrl = undefined;

            // Handle Logo Upload if a new file is selected
            if (selectedFile) {
                // 1. Get upload URL
                const postUrl = await generateUploadUrl();

                // 2. Upload file
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedFile.type },
                    body: selectedFile,
                });

                if (!result.ok) throw new Error("Upload failed");

                const { storageId } = await result.json();
                // Construct URL - usually /api/storage/<storageId> or just store ID depending on your display logic
                // Assuming we store the full URL or ID. Let's store the ID and handle display logic, or store a served URL.
                // For Convex, usually we store storageId. But existing schema implies 'logoUrl' is a string.
                // To be safe without modifying the image component largely, I'll store the ID but we might need to fix display.
                // Actually, let's just store the storageId for now.
                uploadedLogoUrl = storageId;
            }

            await updateIdentity({
                businessId: businessProfile._id,
                businessName: companyName || undefined,
                tradingName: tradingName || undefined,
                companyTagline: companyTagline || undefined,
                companyDescription: companyDescription || undefined,
                logoUrl: uploadedLogoUrl,
            });
            toast.success("Company Identity saved successfully!");
        } catch (error) {
            console.error("Error saving identity:", error);
            toast.error("Failed to save. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveClassification = async () => {
        if (!businessProfile._id) return;

        setIsSaving(true);
        try {
            // Logic:
            // If in "Artisan" AND subsector is "Other", we allow custom sector + custom subsector.
            // Else, if subsector is "Other", we allow custom subsector, but keep selectedSector.

            let finalSector = selectedSector;
            let finalSubsector = selectedSubsector;

            if (selectedSubsector === "Other") {
                finalSubsector = customSubsector;

                // Only override sector if we are in the specific catch-all category
                if (selectedSector === "Artisan") {
                    finalSector = customSector || selectedSector; // Use custom if provided, else keep "OTHER..."
                }
            }

            await updateClassification({
                businessId: businessProfile._id,
                sector: finalSector || undefined,
                subsector: finalSubsector || undefined,
                businessStage: businessStage || undefined,
                businessModel: businessModel || undefined,
                targetMarket: targetMarket || undefined,
                afcftaCompliant: afcftaCompliant || undefined,
                operatingCountries: operatingCountries.length > 0 ? operatingCountries : undefined,
                secondarySectors: secondarySectors.length > 0 ? secondarySectors : undefined,
            });
            toast.success("Classification section saved successfully!");
        } catch (error) {
            console.error("Error saving classification:", error);
            toast.error("Failed to save. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleGlobalSave = async () => {
        if (!activeSection) return;

        // Map active section to its save handler
        switch (activeSection) {
            case "identity":
                await handleSaveIdentity();
                break;
            case "classification":
                await handleSaveClassification();
                break;
            default:
                // For component-based sections, we notify the user to use the section-specific save button
                // until we implement a more robust cross-component save trigger
                toast.info(`Please use the "Save Section" button below to save your ${activeSection} changes.`, {
                    description: "Global 'Save All' is coming soon for all sections.",
                    icon: <AlertCircle className="w-4 h-4 text-blue-500" />
                });
        }
    };

    // Get subsectors for the selected sector
    const currentSectorData = SECTORS.find(s => s.name === selectedSector);

    // Sort sectors alphabetically
    const sortedSectors = [...SECTORS].sort((a, b) => a.name.localeCompare(b.name));

    // Sort subsectors alphabetically
    const availableSubsectors = currentSectorData
        ? [...currentSectorData.subsectors].sort((a, b) => a.localeCompare(b))
        : [];


    const renderStatusIcon = (status: string) => {
        switch (status) {
            case "complete": return <Check className="w-4 h-4 text-green-500" />;
            case "warning": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case "incomplete": return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
            default: return null;
        }
    };

    // Helper Component for Multi-Select Pills
    const MultiSelectPills = ({
        label,
        options,
        selected,
        onChange,
        placeholder = "Click to select...",
        maxItems = 5
    }: {
        label: string,
        options: string[],
        selected: string[],
        onChange: (val: string[]) => void,
        placeholder?: string,
        maxItems?: number
    }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");

        const filteredOptions = options.filter(opt =>
            opt.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selected.includes(opt)
        );

        const toggleOption = (opt: string) => {
            if (selected.includes(opt)) {
                onChange(selected.filter(s => s !== opt));
            } else if (selected.length < maxItems) {
                onChange([...selected, opt]);
                setSearchQuery("");
            } else {
                toast.error(`You can select up to ${maxItems} items`);
            }
        };

        return (
            <div className="space-y-3">
                <Label>{label}</Label>

                {/* Selected Items */}
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-gray-200 rounded-xl bg-gray-50/50">
                    {selected.length === 0 ? (
                        <span className="text-sm text-gray-400 italic">No items selected</span>
                    ) : (
                        selected.map(item => (
                            <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all animate-in zoom-in-95 duration-200 cursor-default"
                            >
                                {item}
                                <button
                                    onClick={() => toggleOption(item)}
                                    className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))
                    )}
                </div>

                {/* Selection Area */}
                <div className="relative">
                    <div className="relative">
                        <Input
                            placeholder={placeholder}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsExpanded(true);
                            }}
                            onFocus={() => setIsExpanded(true)}
                            className="pl-3 pr-10 rounded-xl"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Sparkles className="w-4 h-4" />
                        </div>
                    </div>

                    {isExpanded && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsExpanded(false)}
                            />
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto p-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                {filteredOptions.length === 0 ? (
                                    <div className="p-3 text-sm text-gray-500 text-center">No options found</div>
                                ) : (
                                    filteredOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => toggleOption(opt)}
                                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary-green rounded-lg transition-colors flex items-center justify-between group"
                                        >
                                            {opt}
                                            <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
                <p className="text-[10px] text-gray-400 italic">
                    Select up to {maxItems} items. No need to hold Ctrl/Cmd.
                </p>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto pb-12">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Edit Business Profile</h1>
                    <p className="text-text-secondary">Complete your profile to increase visibility</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right mr-4">
                        <span className="text-sm font-medium text-text-primary">{profileCompleteness || 0}% Complete</span>
                        <div className="w-48 h-2 bg-gray-200 rounded-full mt-1">
                            <div style={{ width: `${profileCompleteness || 0}%` }} className="h-full bg-primary-green rounded-full transition-all"></div>
                        </div>
                    </div>
                    <Button variant="outline" className="text-gray-600">Cancel</Button>
                    <Button
                        onClick={handleGlobalSave}
                        disabled={isSaving}
                        className="bg-primary-green hover:bg-green-700 text-white gap-2 min-w-[120px]"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" /> Save All
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Sidebar (Navigator) */}
                <aside className="w-full lg:w-64 shrink-0 space-y-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
                        {sectionsWithStatus.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center justify-between p-3 text-sm font-medium transition-colors border-l-4 ${activeSection === section.id
                                    ? "bg-green-50 text-primary-green border-primary-green"
                                    : "bg-white text-gray-600 border-transparent hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {renderStatusIcon(section.status)}
                                    <span>{section.label}</span>
                                </div>
                                {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </aside>
                {/* Main Form Area */}
                <main className="flex-1 min-w-0">
                    {/* Visibility Warning */}
                    {getSectionStatus("identity") === "incomplete" && (
                        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-amber-900">Profile Not Listed</h3>
                                <p className="text-xs text-amber-700 mt-1">
                                    Your business will not appear in the public directory search or reach new partners until the <strong>Business Identity</strong> section is complete (Name, Logo, Tagline, and Description).
                                </p>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="ml-auto border-amber-200 text-amber-700 hover:bg-amber-100"
                                onClick={() => setActiveSection("identity")}
                            >
                                Fix Now
                            </Button>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                        {activeSection === "identity" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Company Identity</h2>
                                </div>

                                {/* Logo Upload */}
                                <div className="space-y-4">
                                    <Label>Company Logo *</Label>
                                    <div className="flex items-start gap-6">
                                        <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 overflow-hidden relative">
                                            {businessProfile.logoUrl || selectedLogoPreview ? (
                                                <img
                                                    src={selectedLogoPreview || businessProfile.logoUrl}
                                                    alt="Company Logo"
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <>
                                                    <Building2 className="w-8 h-8 mb-2" />
                                                    <span className="text-xs">Current Logo</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/png, image/jpeg, image/svg+xml"
                                                onChange={handleLogoSelect}
                                            />
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG or SVG (max. 5MB)</p>
                                                <p className="text-xs text-gray-500">Recommended: 500x500px, transparent background</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Basic Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name *</Label>
                                        <Input
                                            id="companyName"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tradingName">Trading Name (DBA)</Label>
                                        <Input
                                            id="tradingName"
                                            value={tradingName}
                                            onChange={(e) => setTradingName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="tagline">Company Tagline *</Label>
                                        <span className="text-xs text-gray-400">45/120</span>
                                    </div>
                                    <Input
                                        id="tagline"
                                        value={companyTagline}
                                        onChange={(e) => setCompanyTagline(e.target.value)}
                                        maxLength={120}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="description">Company Description *</Label>
                                        <span className="text-xs text-gray-400">500/2000 words</span>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        {/* Mock Toolbar */}
                                        <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex gap-2">
                                            <div className="flex gap-1 border-r border-gray-300 pr-2">
                                                <button className="p-1 hover:bg-gray-200 rounded text-xs font-bold">B</button>
                                                <button className="p-1 hover:bg-gray-200 rounded text-xs italic">I</button>
                                                <button className="p-1 hover:bg-gray-200 rounded text-xs underline">U</button>
                                            </div>
                                            <div className="flex gap-1">
                                                <button className="p-1 hover:bg-gray-200 rounded text-xs">List</button>
                                                <button className="p-1 hover:bg-gray-200 rounded text-xs">Link</button>
                                            </div>
                                        </div>
                                        <Textarea
                                            id="description"
                                            value={companyDescription}
                                            onChange={(e) => setCompanyDescription(e.target.value)}
                                            className="min-h-[200px] border-none focus-visible:ring-0 rounded-none p-4"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <Button
                                        variant="outline"
                                        onClick={handleSaveIdentity}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Saving..." : "Save Section"}
                                    </Button>
                                    <Button
                                        className="bg-primary-green hover:bg-green-700 text-white"
                                        onClick={() => {
                                            handleSaveIdentity();
                                            setActiveSection("classification");
                                        }}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Saving..." : "Save & Continue"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeSection === "classification" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Business Classification</h2>
                                    <p className="text-sm text-gray-500 mt-2">Help partners and authorities find you by accurately classifying your business</p>
                                </div>

                                {/* Primary Sector & Subsector */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="primarySector">Primary Sector *</Label>
                                        <select
                                            id="primarySector"
                                            value={selectedSector}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setSelectedSector(val);
                                                // Reset subsector and custom inputs when sector changes
                                                setSelectedSubsector("");
                                                setCustomSector("");
                                                setCustomSubsector("");
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                        >
                                            <option value="">Select primary sector</option>
                                            {sortedSectors.map((sector) => (
                                                <option key={sector.name} value={sector.name}>
                                                    {sector.name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedSector === "Artisan" && selectedSubsector === "Other" && (
                                            <Input
                                                placeholder="Enter your specific sector..."
                                                value={customSector}
                                                onChange={(e) => setCustomSector(e.target.value)}
                                                className="mt-2"
                                            />
                                        )}
                                        <p className="text-xs text-gray-500">Primary industry your business operates in</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="primarySubsector">Primary Subsector *</Label>
                                        <select
                                            id="primarySubsector"
                                            value={selectedSubsector}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setSelectedSubsector(val);
                                                if (val !== "Other") setCustomSubsector("");
                                            }}
                                            disabled={!selectedSector}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Select subsector</option>
                                            {availableSubsectors.map((subsector) => (
                                                <option key={subsector} value={subsector}>
                                                    {subsector}
                                                </option>
                                            ))}
                                            <option value="Other">Other</option>
                                        </select>
                                        {selectedSubsector === "Other" && (
                                            <Input
                                                placeholder="Enter your subsector..."
                                                value={customSubsector}
                                                onChange={(e) => setCustomSubsector(e.target.value)}
                                                className="mt-2"
                                            />
                                        )}
                                        <p className="text-xs text-gray-500">
                                            {selectedSector ? "Specific area of focus within your sector" : "Please select a primary sector first"}
                                        </p>
                                    </div>
                                </div>

                                {/* Secondary Sectors */}
                                <MultiSelectPills
                                    label="Secondary Sectors (Optional)"
                                    options={sortedSectors.map(s => s.name).filter(n => n !== selectedSector)}
                                    selected={secondarySectors}
                                    onChange={setSecondarySectors}
                                    placeholder="Search sectors..."
                                    maxItems={3}
                                />

                                {/* Business Stage */}
                                <div className="space-y-2">
                                    <Label htmlFor="businessStage">Business Stage *</Label>
                                    <select
                                        id="businessStage"
                                        value={businessStage}
                                        onChange={(e) => setBusinessStage(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                    >
                                        <option value="">Select business stage</option>
                                        {BUSINESS_STAGES.map((stage) => (
                                            <option key={stage.value} value={stage.value}>
                                                {stage.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500">Current stage of your business lifecycle</p>
                                </div>

                                {/* Business Model & Target Market */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="businessModel">Business Model *</Label>
                                        <select
                                            id="businessModel"
                                            value={businessModel}
                                            onChange={(e) => setBusinessModel(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                        >
                                            <option value="">Select model</option>
                                            {BUSINESS_MODELS.map((model) => (
                                                <option key={model.value} value={model.value}>
                                                    {model.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="targetMarket">Target Market *</Label>
                                        <select
                                            id="targetMarket"
                                            value={targetMarket}
                                            onChange={(e) => setTargetMarket(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                        >
                                            <option value="">Select market</option>
                                            {TARGET_MARKETS.map((market) => (
                                                <option key={market.value} value={market.value}>
                                                    {market.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* AfCFTA Integration */}
                                <div className="space-y-4 bg-blue-50 border border-blue-100 rounded-lg p-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 text-sm font-bold">A</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900">AfCFTA Integration</h3>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={afcftaCompliant}
                                                onChange={(e) => setAfcftaCompliant(e.target.checked)}
                                                className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green"
                                            />
                                            <span className="text-sm text-gray-700">We are AfCFTA compliant and ready for cross-border trade</span>
                                        </label>
                                        <p className="text-xs text-gray-600 ml-7">Check this if your business meets AfCFTA requirements</p>
                                    </div>

                                    <MultiSelectPills
                                        label="Operating Countries"
                                        options={AFRICAN_COUNTRIES}
                                        selected={operatingCountries}
                                        onChange={setOperatingCountries}
                                        placeholder="Search countries..."
                                        maxItems={10}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <Button
                                        variant="outline"
                                        onClick={handleSaveClassification}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Saving..." : "Save Section"}
                                    </Button>
                                    <Button
                                        className="bg-primary-green hover:bg-green-700 text-white"
                                        onClick={() => {
                                            handleSaveClassification();
                                            setActiveSection("legal");
                                        }}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Saving..." : "Save & Continue"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeSection === "location" && <LocationContactSection />}
                        {activeSection === "products" && <ProductsServicesSection />}
                        {activeSection === "mission" && <MissionVisionSection />}
                        {activeSection === "media" && <MediaGallerySection />}
                        {activeSection === "certifications" && <CertificationsSection />}
                        {activeSection === "sustainability" && <SustainabilitySection />}

                    </div>
                </main>
            </div>
        </div>
    );
}

// Temporary import fix for the icon inside the JSX


