"use client";
import { useState, useEffect } from "react";
import { Plus, X, MapPin } from "lucide-react";

interface InvestorPreferencesProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

const SECTORS = ["Fintech", "Healthtech", "Agritech", "E-commerce", "Logistics", "Clean Energy"];

interface LocationSelection {
    state: string;
    lga: string;
    ward?: string;
}

export function InvestorPreferences({ onNext, onBack, initialData = {} }: InvestorPreferencesProps) {
    const [formData, setFormData] = useState({
        sectors: initialData.sectors || [],
        capitalRange: initialData.capitalRange || "",
        riskAppetite: initialData.riskAppetite || "",
        locations: initialData.locations || [] as LocationSelection[],
    });

    const [allLocations, setAllLocations] = useState<any>(null);
    const [isLoadingLocations, setIsLoadingLocations] = useState(true);
    const [tempLocation, setTempLocation] = useState<LocationSelection>({ state: "", lga: "", ward: "" });

    // Fetch location data on mount
    useEffect(() => {
        fetch('/lgas-with-wards.json')
            .then(res => res.json())
            .then(data => {
                setAllLocations(data);
                setIsLoadingLocations(false);
            })
            .catch(err => {
                console.error("Failed to load locations:", err);
                setIsLoadingLocations(false);
            });
    }, []);

    const toggleSector = (sector: string) => {
        setFormData((prev: any) => {
            const current = prev.sectors;
            const updated = current.includes(sector)
                ? current.filter((s: string) => s !== sector)
                : [...current, sector];
            return { ...prev, sectors: updated };
        });
    };

    const handleAddLocation = () => {
        if (tempLocation.state && tempLocation.lga) {
            setFormData(prev => ({
                ...prev,
                locations: [...prev.locations, { ...tempLocation }]
            }));
            setTempLocation({ state: "", lga: "", ward: "" });
        }
    };

    const removeLocation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            locations: prev.locations.filter((_: any, i: number) => i !== index)
        }));
    };

    // Derived lists based on selection
    const states = allLocations ? Object.keys(allLocations).sort() : [];
    const lgas = (allLocations && tempLocation.state && allLocations[tempLocation.state])
        ? Object.keys(allLocations[tempLocation.state]).sort()
        : [];
    const wards = (allLocations && tempLocation.state && tempLocation.lga && allLocations[tempLocation.state][tempLocation.lga])
        ? allLocations[tempLocation.state][tempLocation.lga].map((w: any) => w.name).sort()
        : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(formData);
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Investment Preferences</h2>
                <p className="text-gray-500 mt-2">
                    Customise your deal flow with specific locations and sectors.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm">

                {/* Locations Section */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Target Locations
                    </label>
                    <div className="space-y-3 bg-white/60 p-4 rounded-xl border border-gray-200">
                        {isLoadingLocations ? (
                            <div className="text-sm text-gray-500 text-center py-4">Loading locations...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        value={tempLocation.state}
                                        onChange={(e) => setTempLocation({ state: e.target.value, lga: "", ward: "" })}
                                        className="w-full rounded-lg border-gray-200 text-sm p-2"
                                    >
                                        <option value="">Select State</option>
                                        {states.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={tempLocation.lga}
                                        onChange={(e) => setTempLocation(prev => ({ ...prev, lga: e.target.value, ward: "" }))}
                                        disabled={!tempLocation.state}
                                        className="w-full rounded-lg border-gray-200 text-sm p-2 disabled:bg-gray-100"
                                    >
                                        <option value="">Select LGA</option>
                                        {lgas.map(lga => (
                                            <option key={lga} value={lga}>{lga}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-2">
                                    <select
                                        value={tempLocation.ward || ""}
                                        onChange={(e) => setTempLocation(prev => ({ ...prev, ward: e.target.value }))}
                                        disabled={!tempLocation.lga}
                                        className="flex-1 rounded-lg border-gray-200 text-sm p-2 disabled:bg-gray-100"
                                    >
                                        <option value="">Select Ward (Optional)</option>
                                        {wards.map((ward: string) => (
                                            <option key={ward} value={ward}>{ward}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={handleAddLocation}
                                        disabled={!tempLocation.state || !tempLocation.lga}
                                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Selected Locations List */}
                        {formData.locations.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.locations.map((loc: LocationSelection, idx: number) => (
                                    <div key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <span>{loc.state} {">"} {loc.lga} {loc.ward ? `> ${loc.ward}` : ""}</span>
                                        <button type="button" onClick={() => removeLocation(idx)} className="hover:text-green-900">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Interested Sectors</label>
                    <div className="grid grid-cols-2 gap-3">
                        {SECTORS.map((sector) => (
                            <div key={sector} className="flex items-center space-x-3 border border-gray-200 bg-white/60 p-3 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition-colors cursor-pointer group">
                                <input
                                    type="checkbox"
                                    id={`sector-${sector}`}
                                    checked={formData.sectors.includes(sector)}
                                    onChange={() => toggleSector(sector)}
                                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                                />
                                <label htmlFor={`sector-${sector}`} className="cursor-pointer text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1 select-none">
                                    {sector}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="capitalRange" className="text-sm font-semibold text-gray-700 ml-1">Capital Range</label>
                    <div className="relative">
                        <select
                            id="capitalRange"
                            value={formData.capitalRange}
                            onChange={(e) => setFormData(prev => ({ ...prev, capitalRange: e.target.value }))}
                            className="flex h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled>Select capital range</option>
                            <option value="1k-10k">$1k - $10k</option>
                            <option value="10k-50k">$10k - $50k</option>
                            <option value="50k-200k">$50k - $200k</option>
                            <option value="200k+">$200k+</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="riskAppetite" className="text-sm font-semibold text-gray-700 ml-1">Risk Appetite</label>
                    <div className="relative">
                        <select
                            id="riskAppetite"
                            value={formData.riskAppetite}
                            onChange={(e) => setFormData(prev => ({ ...prev, riskAppetite: e.target.value }))}
                            className="flex h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white/60 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled>Select risk level</option>
                            <option value="low">Low (Conservative)</option>
                            <option value="medium">Medium (Balanced)</option>
                            <option value="high">High (Aggressive)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-6">
                    <button type="button" onClick={onBack} className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 border border-gray-200 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm">
                        Back
                    </button>
                    <button type="submit" className="w-full h-12 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                        Complete Profile
                    </button>
                </div>
            </form>
        </div>
    );
}
