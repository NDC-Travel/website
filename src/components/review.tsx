"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";

interface ReviewFormProps {
    packageId: string;
    onSubmitted?: () => void;
}

export function ReviewForm({ packageId, onSubmitted }: ReviewFormProps) {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!session) return null;

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) return;
        setLoading(true);
        await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ packageId, rating, comment }),
        });
        setLoading(false);
        setOpen(false);
        setComment("");
        setRating(0);
        onSubmitted?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="mt-4">
                    Laisser un avis
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Partagez votre expérience</DialogTitle>
                </DialogHeader>

                <div className="flex justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                            key={i}
                            onClick={() => setRating(i)}
                            className={`w-6 h-6 cursor-pointer ${
                                i <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                </div>

                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Écrivez votre avis..."
                    className="mb-4"
                />

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
