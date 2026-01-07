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
        <section id="stats-section" className="py-24 bg-gradient-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Ccircle%20cx=%2250%22%20cy=%2250%22%20r=%221%22%20fill=%22rgba(255,255,255,0.1)%22/%3E%3C/svg%3E')] bg-[length:30px_30px] opacity-20"></div>

            <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Platform Impact</h2>
                    <p className="text-lg md:text-xl opacity-90 text-light-gold max-w-2xl mx-auto">
                        Transforming Africa's investment landscape through digital innovation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-baseline gap-1 mb-2 font-bold text-white">
                                <span className="text-4xl lg:text-5xl tracking-tight">{stat.value}</span>
                                <span className="text-2xl text-gold">{stat.suffix}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white/90">{stat.label}</h3>
                            <p className="text-sm text-white/70 leading-relaxed">{stat.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center border border-white/20 max-w-4xl mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-gold/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 p-32 bg-primary-green/20 blur-[100px] rounded-full"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Be Part of Africa's Growth Story</h3>
                        <p className="text-white/90 text-lg mb-0 max-w-2xl mx-auto">
                            Join thousands of businesses and investors leveraging PEBEC BIZ LINK to unlock opportunities across the continent
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
