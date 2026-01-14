"use client";

export default function Stakeholders() {
    const stakeholders = [
        {
            category: "Business Users",
            icon: "🏢",
            color: "stakeholder-business",
            description: "African MSMEs and Corporates seeking growth and investment opportunities",
            features: ["Business Registration", "Profile Verification", "Investment Matching", "Compliance Tools"]
        },
        {
            category: "Investors",
            icon: "💼",
            color: "stakeholder-investor",
            description: "Local and foreign investors looking for verified African business opportunities",
            features: ["Deal Discovery", "Due Diligence Data", "Portfolio Tracking", "Market Intelligence"]
        },
        {
            category: "Regulators & MDAs",
            icon: "⚖️",
            color: "stakeholder-regulator",
            description: "Government agencies ensuring compliance and facilitating business environment",
            features: ["Compliance Monitoring", "Data Analytics", "Policy Implementation", "Reporting Tools"]
        },
        {
            category: "Trade Agencies",
            icon: "🌐",
            color: "stakeholder-trade",
            description: "Trade and investment promotion agencies across the continent",
            features: ["Market Access", "Trade Facilitation", "Investment Promotion", "Cross-Border Support"]
        }
    ];

    const partners = [
        { name: "PEBEC", fullName: "Presidential Enabling Business Environment Council", flag: "🇳🇬" },
        { name: "NRS", fullName: "Federal Inland Revenue Service", flag: "🇳🇬" },
        { name: "AfCFTA", fullName: "African Continental Free Trade Area Secretariat", flag: "🌍" },
        { name: "NIPC", fullName: "Nigerian Investment Promotion Commission", flag: "🇳🇬" },
        { name: "ECOWAS", fullName: "Economic Community of West African States", flag: "🌍" },
        { name: "AU", fullName: "African Union", flag: "🌍" }
    ];

    const colorMap: Record<string, string> = {
        "stakeholder-business": "border-l-4 border-gold",
        "stakeholder-investor": "border-l-4 border-primary-green",
        "stakeholder-regulator": "border-l-4 border-accent-blue",
        "stakeholder-trade": "border-l-4 border-dark-green"
    };

    return (
        <section className="py-24 bg-bg-secondary relative">
            <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                        Who We Serve
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
                        A unified platform connecting all stakeholders in Africa&apos;s investment ecosystem
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {stakeholders.map((stakeholder, index) => (
                        <div key={index} className={`bg-white p-8 rounded-2xl shadow-sm hover:translate-y-[-5px] hover:shadow-md transition-all duration-300 ${colorMap[stakeholder.color] || ''}`}>
                            <div className="text-4xl mb-6">{stakeholder.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-text-primary">{stakeholder.category}</h3>
                            <p className="text-text-secondary mb-8 leading-relaxed h-[3rem]">{stakeholder.description}</p>
                            <ul className="space-y-3">
                                {stakeholder.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-text-primary/80">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-primary-green flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-8">Supported By</h3>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        {partners.map((partner, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-bg-tertiary transition-transform hover:-translate-y-1">
                                <div className="text-2xl">{partner.flag}</div>
                                <div className="text-left">
                                    <div className="font-bold text-text-primary leading-tight">{partner.name}</div>
                                    <div className="text-[10px] text-text-muted max-w-[150px] leading-tight mt-0.5">{partner.fullName}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
