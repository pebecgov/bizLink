import { Briefcase } from "lucide-react";
import { SECTORS } from "../constants/sectors";

interface SectorSelectorProps {
    selectedSector: string;
    selectedSubsector: string;
    onSectorChange: (sector: string) => void;
    onSubsectorChange: (subsector: string) => void;
    errorSector?: string;
    errorSubsector?: string;
}

export default function SectorSelector({
    selectedSector,
    selectedSubsector,
    onSectorChange,
    onSubsectorChange,
    errorSector,
    errorSubsector,
}: SectorSelectorProps) {
    const currentSector = SECTORS.find(s => s.name === selectedSector);

    const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSectorChange(e.target.value);
        onSubsectorChange(""); // Reset subsector when sector changes
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sector Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary-gold" />
                    Business Sector
                </label>
                <div className="relative">
                    <select
                        value={selectedSector}
                        onChange={handleSectorChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errorSector ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all appearance-none bg-white`}
                    >
                        <option value="">Select Sector</option>
                        {SECTORS.map((sector) => (
                            <option key={sector.name} value={sector.name}>
                                {sector.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {errorSector && <p className="text-xs text-red-500">{errorSector}</p>}
            </div>

            {/* Subsector Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">
                    Subsector
                </label>
                <div className="relative">
                    <select
                        value={selectedSubsector}
                        onChange={(e) => onSubsectorChange(e.target.value)}
                        disabled={!selectedSector}
                        className={`w-full px-4 py-3 rounded-xl border ${errorSubsector ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green outline-none transition-all appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400`}
                    >
                        <option value="">Select Subsector</option>
                        {currentSector?.subsectors.sort().map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {errorSubsector && <p className="text-xs text-red-500">{errorSubsector}</p>}
            </div>
        </div>
    );
}
