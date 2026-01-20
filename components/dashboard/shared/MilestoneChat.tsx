"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import {
    CheckCircle,
    Clock,
    FileText,
    Send,
    Calendar,
    AlertCircle,
    ChevronRight,
    Milestone,
    Download,
    Loader2
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { MilestoneProposalModal } from "./MilestoneProposalModal";

export function MilestoneChat({ conversationId }: { conversationId: Id<"conversations"> }) {
    const { user } = useUser();
    const messages = useQuery(api.messages.getMessages, { conversationId });
    const conversation = useQuery(api.messages.getConversation, { conversationId });
    const sendMessage = useMutation(api.messages.sendMessage);
    const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        await sendMessage({ conversationId, content: newMessage, type: "text" });
        setNewMessage("");
    };

    if (!messages || !conversation) return <div>Loading chat...</div>;

    return (
        <div className="flex flex-col h-full bg-[#f1f5f9] overflow-hidden relative border border-slate-200/50 rounded-2xl shadow-inner shadow-slate-200/20">
            {/* Header Overlay - Now Sticky */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h3 className="font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                            Connection Stream
                        </h3>
                        <p className="text-[10px] text-slate-500 font-medium">
                            Engagement Status: <span className="uppercase text-indigo-600 font-bold">{conversation.connectionStatus}</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsMilestoneModalOpen(true)}
                            className="px-4 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                        >
                            <Milestone className="w-3.5 h-3.5" /> Propose Milestone
                        </button>
                    </div>
                </div>
            </div>

            {/* Centered Scrollable Area */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-4xl mx-auto min-h-full flex flex-col pb-32 px-4 sm:px-6">
                    {/* Chat Messages */}
                    <div className="space-y-6 flex flex-col pt-8">
                        {messages.map((msg, idx) => {
                            const isMe = msg.senderId === user?.id;
                            const showAvatar = idx === 0 || messages[idx - 1].senderId !== msg.senderId;

                            return (
                                <div key={msg._id} className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                                        {msg.type === "milestone_proposal" ? (
                                            <MilestoneProposalCard milestoneId={msg.metadata.milestoneId} />
                                        ) : msg.type === "document_request" ? (
                                            <DocumentRequestCard message={msg} />
                                        ) : (
                                            <div className={`group relative px-5 py-3.5 rounded-[2rem] text-sm leading-relaxed shadow-sm transition-all duration-200 ${isMe
                                                ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-tr-none hover:shadow-indigo-100 hover:shadow-xl"
                                                : "bg-white border border-slate-100 text-slate-700 rounded-tl-none hover:border-indigo-100 hover:shadow-lg"
                                                }`}>
                                                {msg.content}
                                                <span className={`absolute bottom-[-18px] text-[9px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "right-2" : "left-2"}`}>
                                                    {format(msg.createdAt, "HH:mm")}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Input Area - Floating Bar */}
            <div className="absolute bottom-6 left-0 right-0 z-30 pointer-events-none">
                <div className="max-w-2xl mx-auto px-4 w-full">
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 p-2 rounded-[2.5rem] shadow-2xl pointer-events-auto flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-6 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-700 placeholder-slate-400 text-sm font-medium"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-40 disabled:shadow-none mr-1 active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>


            {/* Modal - Moved here to escape sticky header context */}
            {conversation.connectionId && (
                <MilestoneProposalModal
                    connectionId={conversation.connectionId as Id<"connections">}
                    isOpen={isMilestoneModalOpen}
                    onClose={() => setIsMilestoneModalOpen(false)}
                />
            )}
        </div>
    );
}

function MilestoneProposalCard({ milestoneId }: { milestoneId: Id<"milestones"> }) {
    const { user } = useUser();
    const milestone = useQuery(api.messages.getMilestone, { milestoneId });
    const agree = useMutation(api.messages.agreeToMilestone);
    const submitDoc = useMutation(api.messages.submitMilestoneDocument);
    const generateUploadUrl = useMutation(api.businessProfile.generateUploadUrl);
    const [isUploading, setIsUploading] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeMilestoneId, setActiveMilestoneId] = useState<Id<"milestones"> | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeMilestoneId) return;

        setIsUploading(activeMilestoneId);
        try {
            // 1. Get upload URL
            const postUrl = await generateUploadUrl();

            // 2. Post file to Convex Storage
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // 3. Save reference in milestone
            await submitDoc({
                milestoneId: activeMilestoneId,
                documentUrl: storageId
            });

            toast.success("Document uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload document");
        } finally {
            setIsUploading(null);
            setActiveMilestoneId(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };
    const verifyDoc = useMutation(api.messages.verifyMilestoneDocument);

    if (!milestone) return null;

    const isPending = milestone.status === "proposed";
    const canManageDoc = milestone.documentStatus === "submitted" && milestone.proposedBy !== user?.id;

    return (
        <div className="w-full max-w-sm bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-xl shadow-slate-100/50 relative overflow-hidden group border-l-4 border-l-indigo-600">
            {/* Invisible File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.png"
            />
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-8 bg-indigo-50/30 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                        <Milestone className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-sm text-slate-900">Collaboration Roadmap</h4>
                        <span className="text-[9px] uppercase font-bold text-indigo-500 tracking-[0.1em]">Agreement Required</span>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <h5 className="font-bold text-slate-900 text-base leading-tight">{milestone.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{milestone.description}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 w-fit px-3 py-1.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        Due {format(milestone.deadline, "MMM dd, yyyy")}
                    </div>

                    {milestone.requiresDocument && (
                        <div className="mt-5 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white border border-slate-200 rounded-lg">
                                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Required Document</span>
                                        <span className="text-[11px] font-bold text-slate-700 underline decoration-indigo-200 underline-offset-2">{milestone.documentType}</span>
                                    </div>
                                </div>
                                {milestone.documentStatus && (
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${milestone.documentStatus === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                                        milestone.documentStatus === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                        {milestone.documentStatus}
                                    </span>
                                )}
                            </div>

                            {milestone.requiresDocument && (
                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                            {milestone.templateUrl ? "Signature Required" : "Document Required"}
                                        </span>
                                        <span className="text-[9px] font-medium text-slate-500">{milestone.documentType}</span>
                                    </div>

                                    {milestone.templateUrl && (
                                        <a
                                            href={milestone.templateUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block w-full py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg text-center hover:bg-indigo-100 transition-all flex items-center justify-center gap-2 mb-2"
                                        >
                                            <Download className="w-3 h-3" /> Download Template
                                        </a>
                                    )}

                                    {milestone.documentUrl ? (
                                        <a
                                            href={milestone.documentUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block w-full py-2 bg-white border border-slate-200 text-slate-900 text-[10px] font-bold rounded-xl text-center hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> View Signed Doc
                                        </a>
                                    ) : milestone.proposedBy === user?.id ? (
                                        <div className="w-full py-2.5 bg-slate-50 border border-slate-200 text-slate-400 text-[10px] font-bold rounded-xl text-center flex items-center justify-center gap-2 italic">
                                            <Clock className="w-3.5 h-3.5" /> Waiting for submission...
                                        </div>
                                    ) : (
                                        <button
                                            disabled={isUploading === milestoneId}
                                            onClick={() => {
                                                setActiveMilestoneId(milestoneId);
                                                fileInputRef.current?.click();
                                            }}
                                            className="w-full py-2.5 bg-indigo-600 text-white text-[10px] font-bold rounded-xl hover:bg-slate-900 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isUploading === milestoneId ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <FileText className="w-3.5 h-3.5" />
                                            )}
                                            {milestone.templateUrl ? "Sign & Return" : "Upload Document"}
                                        </button>
                                    )}
                                </div>
                            )}

                            {canManageDoc && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => verifyDoc({ milestoneId, approved: true })}
                                        className="flex-1 py-2 bg-emerald-500 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-sm"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => verifyDoc({ milestoneId, approved: false })}
                                        className="flex-1 py-2 bg-rose-500 text-white text-[10px] font-bold rounded-xl hover:bg-rose-600 transition-all shadow-sm"
                                    >
                                        Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    {isPending ? (
                        <>
                            <button
                                onClick={() => agree({ milestoneId })}
                                className="flex-1 py-3 bg-slate-900 text-white text-[11px] font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                            >
                                Agree to Terms
                            </button>
                            <button className="flex-1 py-3 border border-slate-200 text-slate-500 text-[11px] font-bold rounded-2xl hover:bg-slate-50 transition-all">
                                Suggest Changes
                            </button>
                        </>
                    ) : (
                        <div className="w-full py-3 bg-emerald-50/50 border border-emerald-100 text-emerald-700 text-[11px] font-bold rounded-2xl flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Roadmap Component Active
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DocumentRequestCard({ message }: { message: any }) {
    const submitDoc = useMutation(api.messages.submitDocument);
    const verifyDoc = useMutation(api.messages.verifyDocument);
    const { documentType, description, status, documentUrl } = message.metadata;

    return (
        <div className="w-full max-w-sm bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-xl shadow-slate-100/50 relative overflow-hidden group border-l-4 border-l-amber-500">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-8 bg-amber-50/30 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-100">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-sm text-slate-900">Document Exchange</h4>
                        <span className="text-[9px] uppercase font-bold text-amber-500 tracking-[0.1em]">{status}</span>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <h5 className="font-bold text-slate-900 text-base leading-tight">{documentType}</h5>
                    {description && <p className="text-xs text-slate-500 italic font-medium">"{description}"</p>}
                </div>

                <div className="flex flex-col gap-3">
                    {status === "pending" ? (
                        <button
                            onClick={() => submitDoc({ messageId: message._id, documentUrl: "https://example.com/demo.pdf" })}
                            className="w-full py-3 bg-amber-500 text-white text-[11px] font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-amber-100 active:scale-95"
                        >
                            Upload Required File
                        </button>
                    ) : status === "submitted" ? (
                        <div className="space-y-3">
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full py-2.5 bg-slate-50 border border-slate-200 text-slate-900 text-[10px] font-bold rounded-xl text-center hover:bg-white hover:border-amber-500 transition-all font-display"
                            >
                                Review Submission
                            </a>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => verifyDoc({ messageId: message._id, approved: true })}
                                    className="flex-1 py-2.5 bg-emerald-500 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-600 transition-all"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => verifyDoc({ messageId: message._id, approved: false })}
                                    className="flex-1 py-2.5 bg-rose-500 text-white text-[10px] font-bold rounded-xl hover:bg-rose-600 transition-all"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-bold border ${status === "verified"
                            ? "bg-emerald-50/50 border-emerald-100 text-emerald-700"
                            : "bg-rose-50/50 border-rose-100 text-rose-700"
                            }`}>
                            {status === "verified" ? (
                                <>
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Document Verified Successfully
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Submission Rejected
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
