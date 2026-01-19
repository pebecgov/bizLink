"use client";

import { useState, useEffect } from "react";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isSignedIn } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Listed Businesses", href: "/businesses" },
        { name: "About Us", href: "#features" },
        { name: "Partners", href: "#stakeholders" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[1000] py-6 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md !py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]" : "bg-white/95 backdrop-blur-md"
                }`}
        >
            <div className="container mx-auto px-6 md:px-8 max-w-7xl flex items-center justify-between">
                <div className="w-full flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col leading-none">
                            <span className={`text-2xl flex items-center justify-center gap-2 font-extrabold tracking-[-0.5px] transition-colors duration-300 text-[#07492F]`}>
                                PEBEC <span className="text-[#761912] text-[0.8rem]">BIZ<span className="">LINK</span></span>
                            </span>
                        </div>
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

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-medium text-[0.95rem] opacity-90 transition-all duration-200 relative text-text-secondary hover:text-primary-green hover:opacity-100"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <button className="p-2 rounded-full transition-all duration-200 text-text-secondary hover:bg-black/5" aria-label="Search">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                            <span className="cursor-pointer opacity-60 transition-opacity duration-200 hover:opacity-100 text-primary-green">EN</span>
                            <span className="opacity-60">|</span>
                            <span className="cursor-pointer opacity-60 transition-opacity duration-200 hover:opacity-100">FR</span>
                        </div>
                        {isSignedIn ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className={`px-6 py-2.5 rounded-[2rem] text-sm font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-px ${isScrolled
                                    ? "bg-primary-green text-white hover:bg-dark-green hover:shadow-[0_4px_12px_rgba(0,135,81,0.3)]"
                                    : "bg-white text-primary-green hover:bg-gold hover:text-primary-green"
                                    }`}>
                                    Dashboard
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        ) : (
                            <SignInButton mode="modal">
                                <button className={`px-6 py-2.5 rounded-[2rem] text-sm font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-px ${isScrolled
                                    ? "bg-primary-green text-white hover:bg-dark-green hover:shadow-[0_4px_12px_rgba(0,135,81,0.3)]"
                                    : "bg-white text-primary-green hover:bg-gold hover:text-primary-green"
                                    }`}>
                                    Sign In
                                </button>
                            </SignInButton>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden block bg-transparent border-none cursor-pointer text-text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`absolute top-full left-0 right-0 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-[400px] p-4" : "max-h-0 p-0"
                }`}>
                <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block px-4 py-3 rounded-lg text-text-primary font-medium transition-colors hover:bg-bg-secondary hover:text-primary-green"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px bg-bg-tertiary my-2"></div>
                    <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-text-secondary text-sm">Language</span>
                        <div className="flex items-center gap-2 font-semibold text-primary-green">
                            <span className="text-gold">EN</span>
                            <span className="text-text-muted">|</span>
                            <span>FR</span>
                        </div>
                    </div>
                    {isSignedIn ? (
                        <div className="flex flex-col gap-2">
                            <Link href="/dashboard" className="w-full mt-2 bg-primary-green text-white py-3 rounded-xl font-semibold shadow-lg text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="w-full mt-2 bg-primary-green text-white py-3 rounded-xl font-semibold shadow-lg">
                                Sign In
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </nav>
    );
}
