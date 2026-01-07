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
        { name: "FIRS", fullName: "Federal Inland Revenue Service", flag: "🇳🇬" },
        { name: "AfCFTA", fullName: "African Continental Free Trade Area Secretariat", flag: "🌍" },
        { name: "NIPC", fullName: "Nigerian Investment Promotion Commission", flag: "🇳🇬" },
        { name: "ECOWAS", fullName: "Economic Community of West African States", flag: "🌍" },
        { name: "AU", fullName: "African Union", flag: "🌍" }
    ];

    return (
        <section className="stakeholders-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Who We Serve</h2>
                    <p className="section-subtitle">
                        A unified platform connecting all stakeholders in Africa's investment ecosystem
                    </p>
                </div>

                <div className="stakeholders-grid">
                    {stakeholders.map((stakeholder, index) => (
                        <div key={index} className={`stakeholder-card ${stakeholder.color}`}>
                            <div className="stakeholder-icon">{stakeholder.icon}</div>
                            <h3 className="stakeholder-title">{stakeholder.category}</h3>
                            <p className="stakeholder-description">{stakeholder.description}</p>
                            <ul className="stakeholder-features">
                                {stakeholder.features.map((feature, idx) => (
                                    <li key={idx} className="stakeholder-feature">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="feature-check">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="partners-section">
                    <h3 className="partners-title">Supported By</h3>
                    <div className="partners-grid">
                        {partners.map((partner, index) => (
                            <div key={index} className="partner-card">
                                <div className="partner-flag">{partner.flag}</div>
                                <div className="partner-info">
                                    <div className="partner-name">{partner.name}</div>
                                    <div className="partner-full-name">{partner.fullName}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
