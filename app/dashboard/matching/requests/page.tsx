"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle, ArrowRight, Building, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_REQUESTS = {
    received: [
        {
            id: "1",
            investorName: "Pan-African Ventures",
            date: "2024-03-15",
            status: "pending",
            message: "We're interested in your recent growth metrics in the Fintech sector."
        },
        {
            id: "2",
            investorName: "Sarah Johnson",
            date: "2024-03-14",
            status: "pending",
            message: "Id like to discuss your seed round opportunities."
        }
    ],
    sent: [
        {
            id: "3",
            investorName: "TechGrowth Capital",
            date: "2024-03-10",
            status: "pending",
            message: "Requesting a meeting to present our Series A deck."
        }
    ],
    accepted: [
        {
            id: "4",
            investorName: "Green Horizon Partners",
            date: "2024-03-01",
            status: "accepted",
            responseDate: "2024-03-02"
        }
    ]
};

export default function MatchRequestsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Match Requests</h1>
                <p className="text-gray-500">Manage your connection requests with investors</p>
            </div>

            <Tabs defaultValue="received" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="received">Received</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="received" className="mt-6 space-y-4">
                    {MOCK_REQUESTS.received.map((req) => (
                        <div key={req.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Building className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{req.investorName}</h3>
                                    <p className="text-sm text-gray-500 mb-1">Received on {req.date}</p>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg mt-2">{req.message}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button variant="outline" className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                    Decline
                                </Button>
                                <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700">
                                    Accept Request
                                </Button>
                            </div>
                        </div>
                    ))}
                    {MOCK_REQUESTS.received.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No new requests received</div>
                    )}
                </TabsContent>

                <TabsContent value="sent" className="mt-6 space-y-4">
                    {MOCK_REQUESTS.sent.map((req) => (
                        <div key={req.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{req.investorName}</h3>
                                    <p className="text-sm text-gray-500">Sent on {req.date}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm text-orange-600 font-medium">Awaiting Response</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" className="text-gray-400 hover:text-gray-600">
                                Withdraw
                            </Button>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="history" className="mt-6 space-y-4">
                    {MOCK_REQUESTS.accepted.map((req) => (
                        <div key={req.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm opacity-75">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{req.investorName}</h3>
                                        <p className="text-sm text-gray-500">Accepted on {req.responseDate}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="gap-2">
                                    Start Conversation <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
