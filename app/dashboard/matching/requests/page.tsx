"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle, ArrowRight, Building, Mail, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { InvestorProfileModal } from "@/components/dashboard/business/InvestorProfileModal";

export default function MatchRequestsPage() {
    const router = useRouter();
    const { user } = useUser();
    const connections = useQuery(api.connections.getMyConnections);
    const respondToConnection = useMutation(api.connections.respondToConnection);
    const declineConnection = useMutation(api.connections.declineConnection);
    const markAllRead = useMutation(api.notifications.markAllAsRead);
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Modal state
    const [viewingInvestorId, setViewingInvestorId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openInvestorProfile = (userId: string) => {
        setViewingInvestorId(userId);
        setIsModalOpen(true);
    };

    // Clear notifications for this page on load
    useEffect(() => {
        markAllRead().catch(console.error);
    }, [markAllRead]);

    if (connections === undefined) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
            </div>
        );
    }

    const userId = user?.id;

    const received = connections.filter(c =>
        c.status === "lead" &&
        c.initiatedBy !== userId
    );

    const sent = connections.filter(c =>
        c.status === "lead" &&
        c.initiatedBy === userId
    );

    const history = connections.filter(c =>
        ["connected", "contract", "closed", "rejected"].includes(c.status)
    );

    const handleAccept = async (connectionId: Id<"connections">) => {
        setProcessingId(connectionId);
        try {
            await respondToConnection({ connectionId });
            toast.success("Connection accepted! You can now start messaging.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to accept request.");
        } finally {
            setProcessingId(null);
        }
    };

    const handleDecline = async (connectionId: Id<"connections">) => {
        setProcessingId(connectionId);
        try {
            await declineConnection({ connectionId });
            toast.success("Request declined.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to decline request.");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Match Requests</h1>
                <p className="text-gray-500">Manage your connection requests with investors</p>
            </div>

            <Tabs defaultValue="received" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="received">Received ({received.length})</TabsTrigger>
                    <TabsTrigger value="sent">Sent ({sent.length})</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="received" className="mt-6 space-y-4">
                    {received.map((req) => {
                        const isBusinessView = req.business?.ownerId === userId;
                        const partyName = isBusinessView
                            ? (req.investorProfile?.registeredName || "Potential Investor")
                            : (req.business?.businessName || "Opportunity");

                        return (
                            <div key={req._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        {isBusinessView ? <User className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{partyName}</h3>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Received on {new Date(req.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-gray-600 font-medium">
                                                {isBusinessView
                                                    ? `${partyName} is interested in ${req.business?.businessName}`
                                                    : "New connection request"}
                                            </p>
                                            {isBusinessView && (
                                                <button
                                                    onClick={() => openInvestorProfile(req.investorId)}
                                                    className="text-[10px] w-fit font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-0.5 rounded transition-colors"
                                                >
                                                    View Investor Profile
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDecline(req._id)}
                                        disabled={processingId === req._id}
                                        className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                    >
                                        Decline
                                    </Button>
                                    <Button
                                        onClick={() => handleAccept(req._id)}
                                        disabled={processingId === req._id}
                                        className="flex-1 md:flex-none bg-primary-green hover:bg-green-700 text-white"
                                    >
                                        {processingId === req._id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Accept Request"}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                    {received.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                            No new requests received
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="sent" className="mt-6 space-y-4">
                    {sent.map((req) => {
                        const isBusinessView = req.business?.ownerId === userId;
                        const partyName = isBusinessView
                            ? (req.investorProfile?.registeredName || "Potential Investor")
                            : (req.business?.businessName || "Opportunity");

                        return (
                            <div key={req._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                        {isBusinessView ? <User className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{partyName}</h3>
                                        <p className="text-sm text-gray-500">Sent on {new Date(req.createdAt).toLocaleDateString()}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Clock className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm text-orange-600 font-medium">Awaiting Response</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {sent.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                            No sent requests pending
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="mt-6 space-y-4">
                    {history.map((req) => {
                        const isBusinessView = req.business?.ownerId === userId;
                        const partyName = isBusinessView
                            ? (req.investorProfile?.registeredName || "Potential Investor")
                            : (req.business?.businessName || "Opportunity");

                        return (
                            <div key={req._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${req.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            {req.status === 'rejected' ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{partyName}</h3>
                                            <p className="text-sm text-gray-500">
                                                {req.status === 'rejected' ? "Declined" : "Accepted"}
                                            </p>
                                        </div>
                                    </div>
                                    {req.status === 'connected' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2"
                                            onClick={() => router.push(`/dashboard/messages/active/${req.conversationId}`)}
                                        >
                                            Go to Chat <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {history.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                            No history found
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {viewingInvestorId && (
                <InvestorProfileModal
                    userId={viewingInvestorId}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
