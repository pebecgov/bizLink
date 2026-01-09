import { QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";

export type UserRole = "admin" | "regulator" | "investor" | "business_owner" | "user";

/**
 * Helper to assert user is authenticated and get user record
 */
export async function assertAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated: No user identity found");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (!user) {
    throw new Error("Unauthenticated: User not found in database");
  }

  if (user.status !== "active") {
    throw new Error("Unauthenticated: User account is suspended");
  }

  return user;
}

/**
 * Helper to enforce authorization and log denials
 * Checks if user has one of the required roles
 * Note: Audit logging only works in mutation context
 */
export async function assertAuthorized(
  ctx: QueryCtx | MutationCtx,
  requiredRoles: UserRole[]
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated: No user identity found");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (!user || user.status !== "active") {
    // Log unauthorized access attempt (only in mutation context)
    if ("insert" in ctx.db && typeof ctx.db.insert === "function") {
      await (ctx.db as MutationCtx["db"]).insert("audit_logs", {
        actorId: identity.subject,
        action: "UNAUTHORIZED_ACCESS_ATTEMPT",
        metadata: {
          attemptedRoles: requiredRoles,
          userFound: !!user,
          userStatus: user?.status,
        },
        timestamp: Date.now(),
      });
    }
    throw new Error("Unauthorized: Insufficient Permissions");
  }

  if (!requiredRoles.includes(user.role)) {
    // Log unauthorized role escalation attempts (only in mutation context)
    if ("insert" in ctx.db && typeof ctx.db.insert === "function") {
      await (ctx.db as MutationCtx["db"]).insert("audit_logs", {
        actorId: identity.subject,
        action: "UNAUTHORIZED_ROLE_ESCALATION_ATTEMPT",
        metadata: {
          userRole: user.role,
          attemptedRoles: requiredRoles,
          userId: user._id,
        },
        timestamp: Date.now(),
      });
    }
    throw new Error("Unauthorized: Insufficient Permissions");
  }

  return user;
}

/**
 * Helper to check if user has jurisdiction access
 * Used for regulator role scoping
 */
export async function assertJurisdictionAccess(
  ctx: QueryCtx | MutationCtx,
  requiredJurisdiction: string
) {
  const user = await assertAuthenticatedUser(ctx);

  if (user.role === "admin") {
    // Admins have access to all jurisdictions
    return user;
  }

  if (user.role === "regulator") {
    if (!user.jurisdiction || user.jurisdiction !== requiredJurisdiction) {
      // Log unauthorized jurisdiction access attempt (only in mutation context)
      if ("insert" in ctx.db && typeof ctx.db.insert === "function") {
        await (ctx.db as MutationCtx["db"]).insert("audit_logs", {
          actorId: user.clerkId,
          action: "UNAUTHORIZED_JURISDICTION_ACCESS_ATTEMPT",
          metadata: {
            userJurisdiction: user.jurisdiction,
            requiredJurisdiction,
            userId: user._id,
          },
          timestamp: Date.now(),
        });
      }
      throw new Error("Unauthorized: Jurisdiction access denied");
    }
  }

  return user;
}

