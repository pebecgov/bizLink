"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentItem, UploadedDocument } from "@/components/dashboard/business/DocumentRequirementsList";
import { ADDITIONAL_DOCUMENTS } from "@/constants/documentTypes";

interface MarketCompetitionSectionProps {
    businessProfile: Doc<"businesses">;
    verificationDocs: UploadedDocument[];
    onUpload: (docType: string, category: string, uploadFormats?: string[]) => void;
    onDelete: (docId: string) => void;
    onView: (url: string) => void;
    uploadingDocs: Set<string>;
}

export function MarketCompetitionSection({
    businessProfile,
    verificationDocs,
    onUpload,
    onDelete,
    onView,
    uploadingDocs
}: MarketCompetitionSectionProps) {

    // MARKET_RESEARCH
    const marketResearchDoc = ADDITIONAL_DOCUMENTS.find(d => d.id === "MARKET_RESEARCH");
    const getUploadedDoc = (id: string) => verificationDocs.find(d => d.documentType === id);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-xl font-bold text-text-primary pb-4 border-b border-gray-100">Market & Competition</h2>
                <p className="text-sm text-gray-500 mt-2">Provide market analysis and competitive information</p>
            </div>

            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                Market analysis form coming soon...
            </div>

            {/* Market Documents */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="col-span-full">
                    <Label className="text-gray-700 font-semibold mb-2 block">Market Research Reports</Label>
                </div>

                {marketResearchDoc && (
                    <DocumentItem
                        doc={marketResearchDoc}
                        status={getUploadedDoc(marketResearchDoc.id)}
                        onUpload={(file) => onUpload(marketResearchDoc.id, marketResearchDoc.category, marketResearchDoc.uploadFormats)}
                        onDelete={onDelete}
                        onView={onView}
                        isUploading={uploadingDocs.has(marketResearchDoc.id)}
                    />
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button className="bg-primary-green hover:bg-green-700 text-white">Save Section</Button>
            </div>
        </div>
    );
}
