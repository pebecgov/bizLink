"use client";

import { HelpCircle, Book, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Help Center</h1>
                <p className="text-text-secondary">Find answers and get support</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                        <Book className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Documentation</h3>
                    <p className="text-sm text-text-secondary mb-4">Browse our comprehensive guides and tutorials</p>
                    <Button variant="outline" size="sm">View Docs</Button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                        <HelpCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">FAQs</h3>
                    <p className="text-sm text-text-secondary mb-4">Find answers to commonly asked questions</p>
                    <Button variant="outline" size="sm">View FAQs</Button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                        <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Live Chat</h3>
                    <p className="text-sm text-text-secondary mb-4">Chat with our support team in real-time</p>
                    <Button variant="outline" size="sm">Start Chat</Button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Email Support</h3>
                    <p className="text-sm text-text-secondary mb-4">Send us an email and we'll get back to you</p>
                    <Button variant="outline" size="sm">Contact Us</Button>
                </div>
            </div>
        </div>
    );
}
