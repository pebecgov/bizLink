"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Landing Page Components
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stakeholders from "@/components/landing/Stakeholders";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

function AuthenticatedContent() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);
  const ensureUserExists = useMutation(api.users.ensureUserExists);
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function syncUser() {
      if (user && currentUser === null && !isSyncing) {
        setIsSyncing(true);
        try {
          await ensureUserExists({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress ?? "",
          });
        } catch (error) {
          console.error("Failed to sync user:", error);
        } finally {
          setIsSyncing(false);
        }
      }
    }

    syncUser();
  }, [user, currentUser, ensureUserExists, isSyncing]);

  // Redirect to dashboard after user is synced
  useEffect(() => {
    if (currentUser && currentUser !== null) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Redirecting to dashboard...</p>
    </div>
  );
}

function UnauthenticatedContent() {
  return (
    <>
      <Navbar />
      <Hero isAuthenticated={false} />
      <Features />
      <Stakeholders />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <>
      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>

      <Unauthenticated>
        <UnauthenticatedContent />
      </Unauthenticated>

      <AuthLoading>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </AuthLoading>
    </>
  );
}

