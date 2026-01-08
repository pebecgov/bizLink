"use client";

export default function Features() {
    const features = [
        {
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
            title: "Cross-Border Investment",
            description: "Facilitate seamless investment deals across African borders with integrated AfCFTA compliance and multi-currency support."
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Verified Business Registry",
            description: "Access comprehensive, verified profiles of African businesses with real-time validation and compliance tracking."
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: "AI-Enabled Matchmaking",
            description: "Intelligent algorithms connect investors with businesses based on sector, growth potential, and strategic alignment."
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "AfCFTA Integration",
            description: "Full integration with African Continental Free Trade Area protocols for simplified cross-border transactions."
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            title: "Tax Compliance Tools",
            description: "Automated TIN generation and tax compliance tracking powered by FIRS integration for seamless operations."
        },
        {
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: "Regulatory Clarity",
            description: "Real-time updates on regulations across African jurisdictions with automated compliance recommendations."
        }
    ];

    return (
        <section className="py-24 bg-bg-primary">
            <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                        Platform Features
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                        Comprehensive tools designed to facilitate investment and business growth across Africa
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-bg-secondary p-8 rounded-2xl border-2 border-transparent transition-all duration-300 cursor-pointer hover:border-primary-green hover:-translate-y-1.5 hover:shadow-xl group">
                            <div className="w-[60px] h-[60px] bg-gradient-primary rounded-xl flex items-center justify-center mb-6 text-white shadow-md">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:text-primary-green transition-colors">{feature.title}</h3>
                            <p className="text-text-secondary mb-6 leading-relaxed">{feature.description}</p>
                            <div className="text-primary-green font-semibold flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
                                Learn more
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
