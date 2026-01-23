"use client";

import { MessageCircle, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Contact Support</h1>
                <p className="text-text-secondary">Get help from our support team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                    <p className="text-sm text-text-secondary">support@bizlink.com</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                    <p className="text-sm text-text-secondary">+234 800 000 0000</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">Hours</h3>
                    <p className="text-sm text-text-secondary">Mon-Fri, 9AM-5PM</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Send us a message</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Describe your issue or question..."
                            rows={6}
                        />
                    </div>

                    <Button className="w-full bg-primary-green hover:bg-green-700">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
}
