import { ShieldCheck, Zap } from "lucide-react";

export function TierBadge({ plan }: { plan?: "free" | "premium" }) {
    if (plan === "premium") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold rounded-full shadow-sm">
                <Zap className="w-3 h-3 fill-current" />
                PREMIUM
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full border border-gray-200">
            <ShieldCheck className="w-3 h-3" />
            FREE TIER
        </span>
    );
}
