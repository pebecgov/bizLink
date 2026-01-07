"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded } = useAuth();
  
  // Create a stable token function - always return a function, even if Clerk isn't loaded yet
  const token = useMemo(() => {
    return async () => {
      if (!isLoaded) {
        return undefined;
      }
      try {
        const token = await getToken({ template: "convex" });
        return token ?? undefined;
      } catch (error) {
        console.error("Error getting Clerk token:", error);
        return undefined;
      }
    };
  }, [getToken, isLoaded]);
  
  return (
    <ConvexProvider client={convex} token={token}>
      {children}
    </ConvexProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
}

