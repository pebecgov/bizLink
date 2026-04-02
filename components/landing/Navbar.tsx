"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-md !py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                    : "bg-white/95 backdrop-blur-md"
            } py-2`}
        >
            <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <AppImage
                            src="/logo.png"
                            alt="BizLink Logo"
                            width={120}
                            height={40}
                            className="object-contain"
                            priority
                        />
                    </Link>
                    <div className="hidden md:flex h-8 w-px bg-black/10"></div>
                    <div className="hidden md:flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-widest leading-[1.2] text-text-secondary">
                            Presidential
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest leading-[1.2] text-text-secondary">
                            Initiative
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
