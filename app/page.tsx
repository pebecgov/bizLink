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

  return (
    <>
      <Navbar />
      <Hero isAuthenticated={true} />
      <Features />
      <Stakeholders />
      <Stats />
      <CTA />
      <Footer />
    </>
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-wider">
            <span className="bg-gradient-gold bg-clip-text text-transparent">PEBEC BIZLINK</span>
          </h1>
          <div className="w-12 h-12 rounded-full border-4 border-primary-green border-t-gold animate-spin"></div>
        </div>
      </AuthLoading>
    </>
  );
}

