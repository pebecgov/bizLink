"use client";

import { SignInButton } from "@clerk/nextjs";

export default function CTA() {
    const userTypes = [
        {
            title: "Business Owner",
            description: "Register your business and access growth and partnership opportunities",
            icon: "🏢"
        },
        {
            title: "Regulator",
            description: "Monitor compliance and facilitate business operations",
            icon: "⚖️"
        },
        {
            title: "Trade Agency",
            description: "Promote cross-border trade and partnership facilitation",
            icon: "🌐"
        }
    ];

    return (
        <section className="py-24 bg-bg-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-gold opacity-5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-primary">
                        Ready to Transform African Business?
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary">
                        Join the leading platform connecting African businesses with global opportunities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {userTypes.map((type, index) => (
                        <div key={index} className="bg-bg-secondary p-8 rounded-2xl text-center border-2 border-transparent hover:border-primary-green hover:shadow-lg transition-all duration-300 group">
                            <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110 duration-300 inline-block">{type.icon}</div>
                            <h3 className="text-lg font-bold mb-2 text-text-primary">{type.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{type.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                    <SignInButton mode="modal">
                        <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-primary-green text-white shadow-green hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-w-[200px]">
                            Create Your Account
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </SignInButton>

                    <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-white text-text-primary border-2 border-bg-tertiary hover:border-primary-green hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
                        Contact Sales
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm font-medium text-text-muted bg-bg-secondary inline-block px-6 py-3 rounded-full">
                        🔒 Secure registration • ✓ Verified profiles • 🌍 Pan-African reach
                    </p>
                </div>
            </div>
        </section>
    );
}
