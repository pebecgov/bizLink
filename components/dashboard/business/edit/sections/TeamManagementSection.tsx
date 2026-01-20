"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentItem, UploadedDocument } from "@/components/dashboard/business/DocumentRequirementsList";
import { ADDITIONAL_DOCUMENTS, CORE_DOCUMENTS } from "@/constants/documentTypes";

interface TeamManagementSectionProps {
    businessProfile: Doc<"businesses">;
    verificationDocs: UploadedDocument[];
    onUpload: (file: File, docType: string, category: string, uploadFormats?: string[]) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    uploadingDocs: Set<string>;
}

export function TeamManagementSection({
    businessProfile,
    verificationDocs,
    onUpload,
    onDelete,
    onView,
    uploadingDocs
}: TeamManagementSectionProps) {

    // DIRECTORS_IDS
    const directorsIdsDoc = ADDITIONAL_DOCUMENTS.find(d => d.id === "DIRECTORS_IDS");
    const getUploadedDoc = (id: string) => verificationDocs.find(d => d.documentType === id);
    const { toast } = useToast();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Team & Management</h2>
                <p className="text-sm text-gray-500 mt-2">Add your team members and key personnel documentation</p>
            </div>

            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                Team member management form coming soon...
            </div>

            {/* Team Documents */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="col-span-full">
                    <Label className="text-gray-700 font-semibold mb-2 block">Management Documentation</Label>
                </div>

                {directorsIdsDoc && (
                    <DocumentItem
                        doc={directorsIdsDoc}
                        status={getUploadedDoc(directorsIdsDoc.id)}
                        onUpload={(file) => onUpload(file, directorsIdsDoc.id, directorsIdsDoc.category, directorsIdsDoc.uploadFormats)}
                        onDelete={onDelete}
                        onView={onView}
                        isUploading={uploadingDocs.has(directorsIdsDoc.id)}
                    />
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    className="bg-primary-green hover:bg-green-700 text-white"
                    onClick={() => toast({ title: "Info", description: "Team management features are coming soon." })}
                >
                    Save Section
                </Button>
            </div>
        </div>
    );
}
