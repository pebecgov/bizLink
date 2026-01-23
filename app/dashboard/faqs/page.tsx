"use client";

import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
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

export default function FAQsPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Frequently Asked Questions</h1>
                <p className="text-text-secondary">Find quick answers to common questions</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="relative mb-6">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <Input placeholder="Search FAQs..." className="pl-10" />
                </div>

                <div className="space-y-6">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="font-semibold text-lg text-text-primary mb-3">{category.category}</h3>
                            <div className="space-y-2">
                                {category.questions.map((faq, qIndex) => {
                                    const key = `${catIndex}-${qIndex}`;
                                    const isOpen = openIndex === key;

                                    return (
                                        <div key={qIndex} className="border border-gray-200 rounded-lg">
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : key)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-medium text-text-primary">{faq.q}</span>
                                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isOpen && (
                                                <div className="px-4 pb-4 text-text-secondary">
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
        </div>
    );
}
