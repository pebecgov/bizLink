import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Phase 1: Identity & Users
  users: defineTable({
    clerkId: v.string(), // External identity link
    email: v.string(),
    role: v.union( // RBAC Role Map
      v.literal("admin"),
      v.literal("regulator"),
      v.literal("investor"),
      v.literal("business_owner")
    ),
    jurisdiction: v.optional(v.string()), // For scoping regulator access
    status: v.union(v.literal("active"), v.literal("suspended")),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_role", ["role"]),

  // Phase 0: Audit Logging
  audit_logs: defineTable({
    actorId: v.string(), // ClerkId or UserId
    action: v.string(),
    entityId: v.optional(v.string()), // The business, deal, or escrow ID
    previousState: v.optional(v.string()),
    newState: v.optional(v.string()),
    metadata: v.any(),
    timestamp: v.number(), // Required for M&E reporting
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_entityId", ["entityId"]),
});

