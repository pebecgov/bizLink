"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, X, Lock as LockIcon, Sparkles } from "lucide-react";

export function MediaGallerySection() {
    const businessProfile = useQuery(api.businessProfile.getMyBusinessProfile);

    if (businessProfile === undefined) {
        return <div className="flex items-center justify-center py-12"><div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (!businessProfile) {
        return null;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-text-primary">Media Gallery</h2>
                {businessProfile.plan !== "premium" && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-bold text-white rounded-full shadow-sm">
                        PREMIUM
                    </span>
                )}
            </div>

            <div className="relative">
                {businessProfile.plan !== "premium" && (
                    <div className="absolute inset-x-0 inset-y-0 z-20 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 rounded-2xl border-2 border-dashed border-amber-200">
                        <div className="p-4 bg-amber-50 rounded-full mb-4">
                            <LockIcon className="w-10 h-10 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Your Visual Story</h3>
                        <p className="text-gray-600 max-w-sm mb-6">
                            Premium businesses can upload high-quality images and videos of their facilities, products, and team to stand out to global investors.
                        </p>
                        <Button
                            className="bg-primary-green hover:bg-green-700 text-white px-8 h-11"
                            onClick={() => window.open('/dashboard/settings/plan', '_self')}
                        >
                            Upgrade to Premium
                        </Button>
                    </div>
                )}

                <div className={`${businessProfile.plan !== "premium" ? "opacity-20 pointer-events-none grayscale select-none" : ""}`}>
                    <p className="text-sm text-gray-500 mb-6">Upload images and videos of your business</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                                <Plus className="w-8 h-8 mb-2" />
                                <span className="text-xs">Add Media</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center py-12 bg-gray-50 rounded-xl border border-gray-100 text-gray-500">
                        Media gallery upload coming soon...
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button className="bg-primary-green hover:bg-green-700 text-white" disabled={businessProfile.plan !== "premium"}>Save Section</Button>
            </div>
        </div>
    );
}
