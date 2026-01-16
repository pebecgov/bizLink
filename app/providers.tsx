"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import Loader from "@/components/ui/Loader";
import { Toaster } from "sonner";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthLoading>
          <Loader />
        </AuthLoading>
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          {children}
        </Unauthenticated>
      </ConvexProviderWithClerk>
      <Toaster />
    </ClerkProvider>
  );
}

