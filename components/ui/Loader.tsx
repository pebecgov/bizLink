"use client";

import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                {/* Green Spinner */}
                {/* Custom Half-Green Half-Red Spinner */}
                <div className="h-12 w-12 rounded-full border-4 border-[#009F62] border-t-[#761912] border-r-[#761912] animate-spin" />

                {/* Dark Red Text */}
                <div className="flex flex-col items-center gap-1">
                    <span className="text-4xl font-bold leading-[1.1] tracking-wider">
                        <span className="text-[#07492F]">BIZLINK</span>
                    </span>

                </div>
            </div>
        </div>
    );
}
