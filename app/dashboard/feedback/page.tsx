"use client";

import { MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Send Feedback</h1>
                <p className="text-text-secondary">Help us improve BizLink with your feedback</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <form className="space-y-6">
                    <div className="space-y-3">
                        <Label>How would you rate your experience?</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="transition-colors"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="feedback">Your Feedback</Label>
                        <Textarea
                            id="feedback"
                            placeholder="Tell us what you think..."
                            rows={8}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="suggestions">Suggestions for Improvement</Label>
                        <Textarea
                            id="suggestions"
                            placeholder="What features would you like to see?"
                            rows={4}
                        />
                    </div>

                    <Button className="w-full bg-primary-green hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Submit Feedback
                    </Button>
                </form>
            </div>
        </div>
    );
}
