"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);
  const router = useRouter();

  if (currentUser === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-dark">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-wider">
          <span className="bg-gradient-gold bg-clip-text text-transparent">PEBEC BIZLINK</span>
        </h1>
        <div className="w-12 h-12 rounded-full border-4 border-primary-green border-t-gold animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center p-6">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-2xl w-full text-center border border-gray-100">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Welcome to your Dashboard</h1>
          <p className="text-xl text-text-secondary">
            Hello, <span className="font-semibold text-primary-green">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 rounded-xl bg-primary-green text-white font-semibold shadow-lg hover:bg-dark-green hover:-translate-y-1 transition-all duration-300"
          >
            Go Home
          </button>

          <SignOutButton>
            <button className="px-8 py-3 rounded-xl bg-bg-secondary text-text-primary border-2 border-primary-green font-semibold hover:bg-very-light-green hover:-translate-y-1 transition-all duration-300">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
