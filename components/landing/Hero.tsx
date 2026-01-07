"use client";

import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-text">Presidential Initiative</span>
                    </div>

                    <h1 className="text-white">
                        PEBEC <span className="hero-highlight">BIZ LINK</span>
                    </h1>

                    <p className="hero-subtitle">
                        Pan-African Investment & Business Facilitation Digital Platform
                    </p>

                    <p className="hero-description">
                        Connecting African businesses with global investors through verified data,
                        intelligent matchmaking, and seamless regulatory compliance across the continent.
                    </p>

                    <div className="hero-features-list">
                        <div className="hero-feature-item">
                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>AfCFTA Integrated</span>
                        </div>
                        <div className="hero-feature-item">
                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>AI-Powered Matching</span>
                        </div>
                        <div className="hero-feature-item">
                            <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Verified Business Registry</span>
                        </div>
                    </div>

                    <div className="hero-cta">
                        {isAuthenticated ? (
                            <button onClick={handleCTA} className="btn btn-primary btn-large">
                                Go to Dashboard
                                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        ) : (
                            <SignInButton mode="modal">
                                <button className="btn btn-primary btn-large">
                                    Get Started
                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </SignInButton>
                        )}

                        <button className="btn btn-secondary btn-large">
                            Learn More
                            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="hero-partners">
                        <span className="partners-label">Powered by</span>
                        <div className="partners-logos">
                            <span className="partner-badge">PEBEC</span>
                            <span className="partner-badge">FIRS</span>
                            <span className="partner-badge">AfCFTA</span>
                            <span className="partner-badge">NIPC</span>
                            <span className="partner-badge">ECOWAS</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="card-icon">🌍</div>
                        <div className="card-content">
                            <div className="card-title">54 Countries</div>
                            <div className="card-subtitle">Pan-African Coverage</div>
                        </div>
                    </div>

                    <div className="floating-card card-2">
                        <div className="card-icon">🤝</div>
                        <div className="card-content">
                            <div className="card-title">AI Matching</div>
                            <div className="card-subtitle">Investor-Business</div>
                        </div>
                    </div>

                    <div className="floating-card card-3">
                        <div className="card-icon">✓</div>
                        <div className="card-content">
                            <div className="card-title">Verified</div>
                            <div className="card-subtitle">Secure & Trusted</div>
                        </div>
                    </div>

                    <div className="hero-globe"></div>
                </div>
            </div>
        </section>
    );
}
