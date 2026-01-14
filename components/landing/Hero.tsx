"use client";

import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Globe2, Handshake, BadgeCheck, Check } from "lucide-react";
import Image from "next/image";

interface HeroProps {
    isAuthenticated?: boolean;
}

export default function Hero({ isAuthenticated }: HeroProps) {
    const router = useRouter();

    const handleCTA = () => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    };

    return (
        <section className="min-h-screen flex items-center bg-white relative overflow-hidden pt-[calc(6rem+20px)] pb-24">
            {/* Court of Arms Background Watermark */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full max-w-[800px] opacity-[0.08]">
                    <Image
                        src="/courtofarm.png"
                        alt="Court of Arms"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center text-center lg:text-left">
                <div>
                    <div className="inline-flex items-center gap-3 bg-[#E8F0E8] px-3 py-1 rounded-lg mb-6">
                        <div className="w-8 h-6 bg-[#009F62] rounded-full flex items-center justify-center p-1">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/courtofarm.png"
                                    alt="Court of Arms"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <span className="text-[#113264] font-semibold text-[14px] uppercase tracking-wider">Presidential Initiative</span>
                    </div>

                    <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1]">
                        <span className="text-[#07492F]">The Digital Gateway</span><br />
                        <span className="text-[#07492F]">for Pan-African</span><br />
                        <span className="text-[#761912]">Investment</span>
                    </h1>

                    <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Connecting African businesses with global investors through verified data,
                        intelligent matchmaking, and seamless regulatory compliance across the continent.
                    </p>

                    <div className="flex flex-col gap-4 mb-8 justify-center lg:justify-start">
                        <div className="flex items-center gap-2 text-[#07492F] text-[0.95rem]">
                            <BadgeCheck fill="#009F62" className="w-5 h-5 text-white" />
                            <span className="text-[0.8rem]">AfCFTA Integrated</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#07492F] text-[0.95rem]">
                            <BadgeCheck fill="#009F62" className="w-5 h-5 text-white" />
                            <span className="text-[0.8rem]">AI-Powered Matching</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#07492F] text-[0.95rem]">
                            <BadgeCheck fill="#009F62" className="w-5 h-5 text-white" />
                            <span className="text-[0.8rem]">Verified Business Registry</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-12 flex-wrap justify-center lg:justify-start">
                        {isAuthenticated ? (
                            <button onClick={handleCTA} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 bg-[#009F62] text-white hover:bg-[#008554] hover:-translate-y-0.5 hover:shadow-xl shadow-md cursor-pointer">
                                Get Started
                                <svg className="w-4 h-4 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        ) : (
                            <SignInButton mode="modal">
                                <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 bg-[#009F62] text-white hover:bg-[#008554] hover:-translate-y-0.5 hover:shadow-xl shadow-md cursor-pointer">
                                    Get Started
                                    <svg className="w-4 h-4 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </SignInButton>
                        )}

                        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 bg-white text-[#009F62] border-2 border-[#009F62] hover:-translate-y-0.5 hover:bg-[#009F62] hover:text-white hover:shadow-xl shadow-sm cursor-pointer">
                            Learn More
                            <svg className="w-4 h-4 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mt-4">
                        <span className="text-[#07492F]/60 text-xs uppercase font-bold tracking-widest hidden md:block">Powered by</span>
                        <div className="h-6 w-px bg-[#07492F]/10 hidden md:block"></div>
                        <div className="flex gap-3 flex-wrap justify-center items-center">
                            <span className="text-[#07492F]/60 text-xs uppercase font-bold tracking-widest md:hidden">Powered by</span>
                            {['PEBEC', 'NRS', 'AfCFTA', 'NIPC', 'ECOWAS'].map((partner) => (
                                <span key={partner} className="px-4 py-1.5 rounded-lg text-xs font-bold text-[#07492F] bg-[#009F62]/5 border border-[#009F62]/20 hover:bg-[#009F62] hover:text-white hover:border-[#009F62] transition-colors duration-300 cursor-default shadow-sm">
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative h-[300px] md:h-[500px] flex items-center justify-center">
                    {/* Card 1: Pan-African Coverage */}
                    <div className="absolute top-[10%] left-[5%] md:left-[10%] bg-[#009F62] rounded-3xl p-4 md:p-5 flex items-center gap-4 animate-float shadow-lg z-10 hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/70 flex items-center justify-center">
                            <Globe2 className="w-6 h-6 md:w-8 md:h-8 text-[#009F62]" />
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-lg leading-tight">54 Countries</div>
                            <div className="text-xs md:text-sm text-white/90 font-medium">Pan-African Coverage</div>
                        </div>
                    </div>

                    {/* Card 2: AI Matching */}
                    <div className="absolute top-[45%] right-[0%] md:right-[5%] bg-[#009F62] rounded-3xl p-4 md:p-5 flex items-center gap-4 animate-float [animation-delay:1.5s] shadow-lg z-10 hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Handshake className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-lg leading-tight">AI Matching</div>
                            <div className="text-xs md:text-sm text-white/90 font-medium">Investor-Business</div>
                        </div>
                    </div>

                    {/* Card 3: Verified */}
                    <div className="absolute bottom-[10%] left-[10%] md:left-[20%] bg-[#009F62] rounded-3xl p-4 md:p-5 flex items-center gap-4 animate-float [animation-delay:2.5s] shadow-lg z-10 hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/70 flex items-center justify-center">
                            <BadgeCheck fill="#009F62" className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-lg leading-tight">Verified</div>
                            <div className="text-xs md:text-sm text-white/90 font-medium">Secure & Trusted</div>
                        </div>
                    </div>

                    {/* Central Globe with Africa Map */}
                    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center z-0">
                        {/* Globe Container */}
                        <div className="relative w-full h-full rounded-full border-2 border-[#009F62]/30 bg-gradient-to-br from-[#009F62]/30 to-[#07492F]/30 flex items-center justify-center overflow-hidden shadow-xl z-0">
                            {/* Grid Lines (Globe Effect) */}
                            <div className="absolute inset-0 opacity-30">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="49" fill="none" stroke="#07492F" strokeWidth="0.8" />
                                    <ellipse cx="50" cy="50" rx="49" ry="20" fill="none" stroke="#07492F" strokeWidth="0.8" transform="rotate(45 50 50)" />
                                    <ellipse cx="50" cy="50" rx="49" ry="20" fill="none" stroke="#07492F" strokeWidth="0.8" transform="rotate(-45 50 50)" />
                                    <path d="M50 0 V100 M0 50 H100" stroke="#07492F" strokeWidth="0.8" fill="none" />
                                </svg>
                            </div>

                            {/* Stylized Africa Map */}
                            <div className="relative w-[80%] h-[80%] z-10 animate-float">
                                <Image
                                    src="/african_map.png"
                                    alt="Africa Map"
                                    fill
                                    className="object-contain"
                                    style={{
                                        filter: "brightness(0) saturate(100%) invert(26%) sepia(55%) saturate(1366%) hue-rotate(115deg) brightness(91%) contrast(101%)"
                                    }}
                                />
                            </div>

                            {/* Rotating Ring */}
                            <div className="absolute inset-0 border-2 border-dashed border-[#009F62]/30 rounded-full animate-spin-slow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
