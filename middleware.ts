import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/api/webhooks/clerk", // Clerk webhook endpoint (must be public)
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
