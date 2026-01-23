"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        category: "Getting Started",
        questions: [
            {
                q: "How do I create a business profile?",
                a: "Navigate to the Business Profile section in your dashboard and click 'Edit Profile' to add your business information."
            },
            {
                q: "How do I verify my business?",
                a: "Complete your business profile with all required information and upload necessary verification documents."
            }
        ]
    },
    {
        category: "Account & Settings",
        questions: [
            {
                q: "How do I change my password?",
                a: "Go to Settings > Account and click on 'Change Password' to update your credentials."
            },
            {
                q: "How do I update my notification preferences?",
                a: "Visit Settings > Notifications to customize how you receive updates."
            }
        ]
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    return (
        <section className="py-20 bg-bg-dark">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-gold bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h2>
                    <p className="text-text-secondary text-lg">
                        Find quick answers to common questions
                    </p>
                </div>

                <div className="space-y-8">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
                            <div className="space-y-3">
                                {category.questions.map((faq, qIndex) => {
                                    const key = `${catIndex}-${qIndex}`;
                                    const isOpen = openIndex === key;

                                    return (
                                        <div
                                            key={qIndex}
                                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-primary-green/50 transition-all"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : key)}
                                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="font-medium text-white pr-4">{faq.q}</span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-primary-green flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-5 pb-5 text-text-secondary">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
