import { MapPin } from "lucide-react";
import { NIGERIAN_STATES } from "../constants/locations";

interface StateSelectorProps {
    selectedState: string;
    selectedLGA: string;
    onStateChange: (state: string) => void;
    onLGAChange: (lga: string) => void;
    errorState?: string;
    errorLGA?: string;
}

export default function StateSelector({
    selectedState,
    selectedLGA,
    onStateChange,
    onLGAChange,
    errorState,
    errorLGA,
}: StateSelectorProps) {
    const currentState = NIGERIAN_STATES.find(s => s.name === selectedState);

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onStateChange(e.target.value);
        onLGAChange(""); // Reset LGA when state changes
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-gold" />
                    State of Operation
                </label>
                <div className="relative">
                    <select
                        value={selectedState}
                        onChange={handleStateChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errorState ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all appearance-none bg-white`}
                    >
                        <option value="">Select State</option>
                        {NIGERIAN_STATES.map((state) => (
                            <option key={state.name} value={state.name}>
                                {state.name}State
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {errorState && <p className="text-xs text-red-500">{errorState}</p>}
            </div>

            {/* LGA Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">
                    Local Government Area
                </label>
                <div className="relative">
                    <select
                        value={selectedLGA}
                        onChange={(e) => onLGAChange(e.target.value)}
                        disabled={!selectedState}
                        className={`w-full px-4 py-3 rounded-xl border ${errorLGA ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400`}
                    >
                        <option value="">Select LGA</option>
                        {currentState?.lgas.map((lga) => (
                            <option key={lga} value={lga}>
                                {lga}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {errorLGA && <p className="text-xs text-red-500">{errorLGA}</p>}
            </div>
        </div>
    );
}
