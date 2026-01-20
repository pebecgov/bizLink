"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
    CheckCircle,
    Clock,
    FileText,
    Send,
    Calendar,
    AlertCircle,
    ChevronRight,
    Milestone
} from "lucide-react";
import { format } from "date-fns";

export function MilestoneChat({ conversationId }: { conversationId: Id<"conversations"> }) {
    const messages = useQuery(api.messages.getMessages, { conversationId });
    const conversation = useQuery(api.messages.getConversation, { conversationId });
    const sendMessage = useMutation(api.messages.sendMessage);
    const proposeMilestone = useMutation(api.messages.proposeMilestone);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        await sendMessage({ conversationId, content: newMessage, type: "text" });
        setNewMessage("");
    };

    const handlePropose = async () => {
        await proposeMilestone({
            connectionId: conversation?.connectionId as Id<"connections">,
            title: "Project Kickoff & Initial Due Diligence",
            description: "Review of CAC documents and initial business model verification.",
            deadline: Date.now() + 7 * 24 * 60 * 60 * 1000, // +7 days
        });
    };

    if (!messages || !conversation) return <div>Loading chat...</div>;

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-gray-900">Connection Stream</h3>
                    <p className="text-xs text-gray-500">Status: <span className="uppercase font-bold text-green-600">{conversation.connectionStatus}</span></p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePropose}
                        className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                        <Milestone className="w-3 h-3" /> Propose Milestone
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                        {msg.type === "milestone_proposal" ? (
                            <MilestoneProposalCard milestoneId={msg.metadata.milestoneId} />
                        ) : msg.type === "document_request" ? (
                            <DocumentRequestCard message={msg} />
                        ) : (
                            <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.senderId === "me"
                                ? "bg-green-600 text-white rounded-tr-none"
                                : "bg-gray-100 text-gray-800 rounded-tl-none"
                                }`}>
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message or propose a milestone..."
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function MilestoneProposalCard({ milestoneId }: { milestoneId: Id<"milestones"> }) {
    const milestone = useQuery(api.messages.getMilestone, { milestoneId }); // I need to implement this
    const agree = useMutation(api.messages.agreeToMilestone);

    if (!milestone) return null;

    const isPending = milestone.status === "proposed";

    return (
        <div className="w-full max-w-sm bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Milestone className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-blue-900">Milestone Proposal</h4>
                    <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Requires Agreement</span>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <h5 className="font-semibold text-gray-900 text-sm">{milestone.title}</h5>
                <p className="text-xs text-gray-600 line-clamp-2">{milestone.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    Deadline: {format(milestone.deadline, "MMM dd, yyyy")}
                </div>
            </div>

            <div className="flex gap-2">
                {isPending ? (
                    <>
                        <button
                            onClick={() => agree({ milestoneId })}
                            className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Agree & Sign
                        </button>
                        <button className="flex-1 py-2 border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
                            Counter Offer
                        </button>
                    </>
                ) : (
                    <div className="w-full py-2 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> Agreed
                    </div>
                )}
            </div>
        </div>
    );
}

function DocumentRequestCard({ message }: { message: any }) {
    const submitDoc = useMutation(api.messages.submitDocument);
    const verifyDoc = useMutation(api.messages.verifyDocument);
    const { documentType, description, status, documentUrl } = message.metadata;

    return (
        <div className="w-full max-w-sm bg-orange-50 border border-orange-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-orange-900">Document Request</h4>
                    <span className="text-[10px] uppercase font-bold text-orange-500 tracking-wider">{status}</span>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <h5 className="font-semibold text-gray-900 text-sm">{documentType}</h5>
                {description && <p className="text-xs text-gray-600 italic">"{description}"</p>}
            </div>

            <div className="flex flex-col gap-2">
                {status === "pending" ? (
                    <button
                        onClick={() => submitDoc({ messageId: message._id, documentUrl: "https://example.com/demo.pdf" })}
                        className="w-full py-2 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Upload Document
                    </button>
                ) : status === "submitted" ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => verifyDoc({ messageId: message._id, approved: true })}
                            className="flex-1 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => verifyDoc({ messageId: message._id, approved: false })}
                            className="flex-1 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Reject
                        </button>
                    </div>
                ) : (
                    <div className={`w-full py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold ${status === "verified" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                        {status === "verified" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                )}
            </div>
        </div>
    );
}
