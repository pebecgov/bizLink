"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MessagesRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/dashboard/messages/active");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 animate-pulse">Redirecting to active conversations...</p>
        </div>
    );
}
