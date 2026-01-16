"use client";

import { Search, Save, History, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SECTORS } from "@/components/onboarding/constants/sectors";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export default function AdvancedSearchPage() {
    const { user } = useUser();
    const saveSearch = useMutation(api.investorActions.saveSearch);
    const deleteSearch = useMutation(api.investorActions.deleteSavedSearch);
    const savedSearches = useQuery(api.investorActions.getSavedSearches);

    const [form, setForm] = useState({
        keywords: "",
        location: "",
        sector: "",
        businessStage: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveSearch = async () => {
        if (!form.keywords && !form.sector && !form.location && !form.businessStage) {
            toast.error("Please enter at least one search criteria");
            return;
        }

        setIsSaving(true);
        try {
            await saveSearch({
                name: `${form.sector || "All Sectors"} in ${form.location || "Any Location"}`,
                criteria: form,
            });
            toast.success("Search saved successfully");
        } catch (error) {
            toast.error("Failed to save search");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteSearch = async (id: Id<"saved_searches">) => {
        try {
            await deleteSearch({ id });
            toast.success("Search deleted");
        } catch (error) {
            toast.error("Failed to delete search");
        }
    };

    const loadSearch = (criteria: any) => {
        setForm({
            keywords: criteria.keywords || "",
            location: criteria.location || "",
            sector: criteria.sector || "",
            businessStage: criteria.businessStage || "",
        });
        toast.info("Search criteria loaded");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Advanced Search</h1>
                    <p className="text-gray-500">Find specific opportunities with detailed filters</p>
                </div>
                <Button variant="outline" className="gap-2" onClick={handleSaveSearch} disabled={isSaving}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Search
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <Label>Keywords</Label>
                        <Input
                            placeholder="Tech, Agriculture, Fintech..."
                            value={form.keywords}
                            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                            placeholder="Country, City..."
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Sector</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={form.sector}
                            onChange={(e) => setForm({ ...form, sector: e.target.value })}
                        >
                            <option value="">Any Sector</option>
                            {SECTORS.map((sector) => (
                                <option key={sector.name} value={sector.name}>
                                    {sector.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Investment Stage</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={form.businessStage}
                            onChange={(e) => setForm({ ...form, businessStage: e.target.value })}
                        >
                            <option value="">Any Stage</option>
                            <option value="Pre-Seed">Pre-Seed</option>
                            <option value="Seed">Seed</option>
                            <option value="Series A">Series A</option>
                            <option value="Series B">Series B</option>
                            <option value="Growth">Growth</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button className="bg-primary-green hover:bg-green-700 w-full md:w-auto">
                        <Search className="w-4 h-4 mr-2" /> Search Opportunities
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-gray-500" /> Saved Searches
                </h3>

                {!savedSearches ? (
                    <div className="flex gap-2">
                        <div className="h-8 w-32 bg-gray-100 rounded-full animate-pulse"></div>
                        <div className="h-8 w-40 bg-gray-100 rounded-full animate-pulse"></div>
                    </div>
                ) : savedSearches.length === 0 ? (
                    <p className="text-gray-500 text-sm">No saved searches yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {savedSearches.map((search) => (
                            <div key={search._id} className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm text-gray-700 hover:border-green-300 hover:bg-green-50 transition-colors flex items-center gap-2 group">
                                <span onClick={() => loadSearch(search.criteria)} className="cursor-pointer">
                                    {search.name}
                                </span>
                                <button
                                    onClick={() => handleDeleteSearch(search._id)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
