"use client";

import { SignInButton } from "@clerk/nextjs";

export default function CTA() {
    const userTypes = [
        {
            title: "Business Owner",
            description: "Register your business and access investment opportunities",
            icon: "🏢"
        },
        {
            title: "Investor",
            description: "Discover verified African businesses ready for growth",
            icon: "💼"
        },
        {
            title: "Regulator",
            description: "Monitor compliance and facilitate business operations",
            icon: "⚖️"
        },
        {
            title: "Trade Agency",
            description: "Promote cross-border trade and investment facilitation",
            icon: "🌐"
        }
    ];

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Transform African Business?</h2>
                    <p className="cta-subtitle">
                        Join the leading platform connecting African businesses with global opportunities
                    </p>

                    <div className="user-types-grid">
                        {userTypes.map((type, index) => (
                            <div key={index} className="user-type-card">
                                <div className="user-type-icon">{type.icon}</div>
                                <h3 className="user-type-title">{type.title}</h3>
                                <p className="user-type-description">{type.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="cta-actions">
                        <SignInButton mode="modal">
                            <button className="btn btn-primary btn-large">
                                Create Your Account
                                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </SignInButton>

                        <button className="btn btn-outline btn-large">
                            Contact Sales
                            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>

                    <p className="cta-note">
                        🔒 Secure registration • ✓ Verified profiles • 🌍 Pan-African reach
                    </p>
                </div>
            </div>
        </section>
    );
}
