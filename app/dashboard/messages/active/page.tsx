"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { MessageSquare, ArrowRight, Clock, Building, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ActiveConversationsPage() {
    const router = useRouter();
    const { user } = useUser();
    const conversations = useQuery(api.messages.getMyConversations);

    if (conversations === undefined) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
            </div>
        );
    }

    const userId = user?.id;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Active Conversations</h1>
                <p className="text-gray-500">Manage your active chats and business collaborations.</p>
            </div>

            <div className="grid gap-4">
                {conversations.map((conv) => {
                    const partnerName = conv.partnerName || "Partner";

                    return (
                        <div
                            key={conv._id}
                            onClick={() => router.push(`/dashboard/messages/active/${conv._id}`)}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-primary-green transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-green/10 group-hover:text-primary-green transition-colors">
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-gray-900">{partnerName}</h3>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                <span>{conv.business?.businessName || "Business Discussion"}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>Active {new Date(conv.lastMessageAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-green" />
                                </Button>
                            </div>
                        </div>
                    );
                })}

                {conversations.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No active conversations yet</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            Visit the business directory to find partners and start a conversation.
                        </p>
                        <Button
                            onClick={() => router.push("/businesses")}
                            className="mt-6 bg-primary-green hover:bg-green-700 text-white"
                        >
                            Browse Directory
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

