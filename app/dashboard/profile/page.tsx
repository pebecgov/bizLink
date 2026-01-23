"use client";

import { User, Mail, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">My Profile</h1>
                <p className="text-text-secondary">Manage your personal information</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-400" />
                        </div>
                        <div>
                            <Button variant="outline">Change Photo</Button>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Enter last name" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            <Input id="email" type="email" className="pl-10" placeholder="email@example.com" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                            <Input id="phone" type="tel" className="pl-10" placeholder="+234 800 000 0000" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-primary-green hover:bg-green-700">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
