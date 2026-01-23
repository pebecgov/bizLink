"use client";

import AppImage from "@/components/ui/AppImage";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                {/* Pulsing Logo */}
                <div className="animate-pulse">
                    <AppImage
                        src="/logo.png"
                        alt="BizLink Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                    />
                </div>


            </div>
        </div>
    );
}
