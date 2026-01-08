"use client";

import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Globe2, Handshake, BadgeCheck } from "lucide-react";
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
        <section className="min-h-screen flex items-center bg-bg-dark relative overflow-hidden pt-[calc(6rem+80px)] pb-24 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Ccircle%20cx=%2250%22%20cy=%2250%22%20r=%221%22%20fill=%22rgba(255,255,255,0.1)%22/%3E%3C/svg%3E')] bg-[length:50px_50px]">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-overlay opacity-90 z-0 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,215,0,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(0,135,81,0.1)_0%,transparent_50%)] z-0 pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center text-center lg:text-left">
                <div className="text-white">
                    <div className="inline-block bg-[rgba(255,215,0,0.2)] backdrop-blur-md px-4 py-2 rounded-xl mb-6 border border-[rgba(255,215,0,0.3)]">
                        <span className="text-gold font-semibold text-sm uppercase tracking-wider">Presidential Initiative</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] text-white">
                        PEBEC BIZ<span className="text-gold">LINK</span>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl text-light-gold mb-6 font-medium">
                        Pan-African Investment & Business Facilitation Digital Platform
                    </p>

                    <p className="text-lg text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Connecting African businesses with global investors through verified data,
                        intelligent matchmaking, and seamless regulatory compliance across the continent.
                    </p>

                    <div className="flex flex-wrap gap-6 mb-12 justify-center lg:justify-start">
                        <div className="flex items-center gap-2 text-white/90 text-[0.95rem]">
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>AfCFTA Integrated</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-[0.95rem]">
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>AI-Powered Matching</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-[0.95rem]">
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Verified Business Registry</span>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-12 flex-wrap justify-center lg:justify-start">
                        {isAuthenticated ? (
                            <button onClick={handleCTA} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-gradient-primary text-white shadow-green hover:-translate-y-0.5 hover:shadow-xl cursor-pointer">
                                Go to Dashboard
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        ) : (
                            <SignInButton mode="modal">
                                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-gradient-primary text-white shadow-green hover:-translate-y-0.5 hover:shadow-xl cursor-pointer">
                                    Get Started
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </SignInButton>
                        )}

                        <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 bg-bg-secondary text-text-primary border-2 border-primary-green hover:-translate-y-0.5 hover:bg-very-light-green cursor-pointer">
                            Learn More
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                        <span className="text-white/70 text-sm">Powered by</span>
                        <div className="flex gap-4 flex-wrap justify-center">
                            {['PEBEC', 'FIRS', 'AfCFTA', 'NIPC', 'ECOWAS'].map((partner) => (
                                <span key={partner} className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-semibold border border-white/20">
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative h-[300px] md:h-[500px] flex items-center justify-center">
                    {/* Animated Pulse Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-primary-green/20 rounded-full blur-[80px] animate-pulse-slow z-0"></div>

                    {/* Card 1: Pan-African Coverage */}
                    <div className="absolute top-[10%] left-[5%] md:left-[10%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-5 flex items-center gap-4 animate-float shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 hover:scale-105 transition-transform duration-300 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 flex items-center justify-center group-hover:from-green-400/30 group-hover:to-emerald-600/30 transition-colors">
                            <Globe2 className="w-6 h-6 md:w-8 md:h-8 text-primary-green drop-shadow-lg" />
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-lg leading-tight">54 Countries</div>
                            <div className="text-xs md:text-sm text-white/70 font-medium">Pan-African Coverage</div>
                        </div>
                    </div>

                    {/* Card 2: AI Matching */}
                    <div className="absolute top-[45%] right-[0%] md:right-[5%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-5 flex items-center gap-4 animate-float [animation-delay:1.5s] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 hover:scale-105 transition-transform duration-300 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-orange-500/30 transition-colors">
                            <Handshake className="w-6 h-6 md:w-8 md:h-8 text-gold drop-shadow-lg" />
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-lg leading-tight">AI Matching</div>
                            <div className="text-xs md:text-sm text-white/70 font-medium">Investor-Business</div>
                        </div>
                    </div>

                    {/* Card 3: Verified */}
                    <div className="absolute bottom-[10%] left-[10%] md:left-[20%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-5 flex items-center gap-4 animate-float [animation-delay:2.5s] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 hover:scale-105 transition-transform duration-300 group">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 flex items-center justify-center group-hover:from-blue-400/30 group-hover:to-indigo-500/30 transition-colors">
                            <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-400 drop-shadow-lg" />
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-lg leading-tight">Verified</div>
                            <div className="text-xs md:text-sm text-white/70 font-medium">Secure & Trusted</div>
                        </div>
                    </div>

                    {/* Central Globe with Africa Map */}
                    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary-green/20 rounded-full blur-[60px] animate-pulse-slow"></div>

                        {/* Globe Container */}
                        <div className="relative w-full h-full rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,135,81,0.2)]">
                            {/* Grid Lines (Globe Effect) */}
                            <div className="absolute inset-0 opacity-20">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="49" fill="none" stroke="white" strokeWidth="0.5" />
                                    <ellipse cx="50" cy="50" rx="49" ry="20" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(45 50 50)" />
                                    <ellipse cx="50" cy="50" rx="49" ry="20" fill="none" stroke="white" strokeWidth="0.5" transform="rotate(-45 50 50)" />
                                    <path d="M50 0 V100 M0 50 H100" stroke="white" strokeWidth="0.5" fill="none" />
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
                                        filter: "brightness(0) saturate(100%) invert(34%) sepia(85%) saturate(1637%) hue-rotate(136deg) brightness(93%) contrast(101%) drop-shadow(0 0 1px #FFD700) drop-shadow(0 0 1px #FFD700)"
                                    }}
                                />
                            </div>

                            {/* Rotating Ring */}
                            <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-spin-slow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
