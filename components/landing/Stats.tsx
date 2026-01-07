"use client";

import { useEffect, useState } from "react";

export default function Stats() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById("stats-section");
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const stats = [
        {
            value: "54",
            suffix: "",
            label: "African Countries",
            description: "Pan-African coverage for seamless cross-border operations"
        },
        {
            value: "10",
            suffix: "K+",
            label: "Verified Businesses",
            description: "Comprehensive business profiles across sectors"
        },
        {
            value: "500",
            suffix: "M+",
            label: "Investment Deals",
            description: "Total value facilitated through the platform"
        },
        {
            value: "75",
            suffix: "%",
            label: "Time Saved",
            description: "Reduction in regulatory compliance processing"
        },
        {
            value: "1",
            suffix: "M+",
            label: "TINs Generated",
            description: "Expanding Africa's formal business ecosystem"
        },
        {
            value: "200",
            suffix: "+",
            label: "Active Investors",
            description: "Global and local investors seeking opportunities"
        }
    ];

    return (
        <section id="stats-section" className="stats-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Platform Impact</h2>
                    <p className="section-subtitle">
                        Transforming Africa's investment landscape through digital innovation
                    </p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className={`stat-card ${isVisible ? 'animate' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="stat-value-wrapper">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-suffix">{stat.suffix}</span>
                            </div>
                            <h3 className="stat-label">{stat.label}</h3>
                            <p className="stat-description">{stat.description}</p>
                        </div>
                    ))}
                </div>

                <div className="stats-cta">
                    <div className="stats-cta-content">
                        <h3 className="stats-cta-title">Be Part of Africa's Growth Story</h3>
                        <p className="stats-cta-text">
                            Join thousands of businesses and investors leveraging PEBEC BIZ LINK to unlock opportunities across the continent
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
