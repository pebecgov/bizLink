"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

function AuthenticatedContent() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);

  return (
    <div>
      <h2>Welcome, {user?.emailAddresses[0]?.emailAddress}</h2>
      {currentUser === undefined ? (
        <div>Loading user data...</div>
      ) : currentUser === null ? (
        <div>
          <p>User not found in database. Please wait for sync or contact support.</p>
        </div>
      ) : (
        <div>
          <p>Role: {currentUser.role}</p>
          {currentUser.jurisdiction && (
            <p>Jurisdiction: {currentUser.jurisdiction}</p>
          )}
          <p>Status: {currentUser.status}</p>
        </div>
      )}
      <SignOutButton />
    </div>
  );
}

function UnauthenticatedContent() {
  return (
    <div>
      <p>Please sign in to continue.</p>
      <SignInButton />
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>P-BID Platform</h1>
      <p>PEBEC Business-Investment Direct Platform</p>

      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedContent />
      </Unauthenticated>
      <AuthLoading>
        <div>Loading authentication...</div>
      </AuthLoading>
    </main>
  );
}

