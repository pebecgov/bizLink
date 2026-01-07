# P-BID Architecture: Module 0 & 1

## Architecture Overview

This document describes the infrastructure-grade foundation architecture for the P-BID platform.

## Core Principles

1. **Single Source of Truth**: Convex manages all business state
2. **Identity & Auth Separation**: Clerk handles identity; internal RBAC handles authorization
3. **Auditability**: If it is not logged, it did not happen
4. **Immutability**: Admin actions are reversible only via audit trails
5. **No Logic Leaks**: UI never mutates state directly

## Data Flow

```
┌─────────────┐
│   Clerk     │  External Identity Provider
│  (Identity) │
└──────┬──────┘
       │
       │ Webhook: user.created/user.updated
       ▼
┌─────────────────┐
│  Next.js API    │  /api/webhooks/clerk
│     Route       │
└──────┬──────────┘
       │
       │ Mutation: ensureUserExists
       ▼
┌─────────────────┐
│     Convex      │  Single Source of Truth
│   (Backend)     │
└─────────────────┘
       │
       │ Query/Mutation with RBAC
       ▼
┌─────────────────┐
│  Next.js UI     │  React Components
│  (Frontend)     │
└─────────────────┘
```

## Security Layers

### Layer 1: Clerk Middleware
- **File**: `proxy.ts`
- **Purpose**: Protects all routes by default using `clerkMiddleware()` from `@clerk/nextjs/server`
- **Public Routes**: Sign-in/sign-up pages are handled automatically by Clerk

### Layer 2: Convex RBAC
- **File**: `convex/accessControl.ts`
- **Functions**:
  - `assertAuthenticatedUser`: Verifies user exists and is active
  - `assertAuthorized`: Checks user has required role(s)
  - `assertJurisdictionAccess`: Validates jurisdiction for regulators

### Layer 3: Audit Logging
- **File**: `convex/audit.ts`
- **Function**: `emitAuditLog`
- **Mandate**: Every critical action MUST emit an audit event

## Database Schema

### Users Table
```typescript
{
  clerkId: string,        // External identity link
  email: string,
  role: "admin" | "regulator" | "investor" | "business_owner",
  jurisdiction?: string,  // For regulator scoping
  status: "active" | "suspended"
}
```

**Indexes**:
- `by_clerkId`: Fast lookup by Clerk ID
- `by_role`: Filter by role

### Audit Logs Table
```typescript
{
  actorId: string,           // ClerkId or UserId
  action: string,            // Action name (e.g., "USER_ROLE_CHANGED")
  entityId?: string,         // Related entity ID
  previousState?: string,    // State before change
  newState?: string,         // State after change
  metadata: any,             // Additional context
  timestamp: number          // Unix timestamp
}
```

**Indexes**:
- `by_timestamp`: Time-series queries
- `by_entityId`: Entity history queries

## RBAC Permission Map

| Role | Permissions |
|------|-------------|
| `admin` | Full access to all entities, can change roles, manage users |
| `regulator` | Read-only access to businesses in their jurisdiction |
| `investor` | Can view businesses, create investment proposals |
| `business_owner` | Can create/edit own business, view own deals |

## Mutation Patterns

### Standard Mutation Pattern
```typescript
export const myMutation = mutation({
  args: { /* ... */ },
  handler: async (ctx, args) => {
    // 1. Authenticate & Authorize
    const user = await assertAuthorized(ctx, ["admin", "business_owner"]);
    
    // 2. Perform business logic
    const result = await ctx.db.insert("table", { /* ... */ });
    
    // 3. Audit log
    await emitAuditLog(ctx, {
      actorId: user.clerkId,
      action: "ENTITY_CREATED",
      entityId: result,
      newState: "created",
      metadata: { /* ... */ }
    });
    
    return result;
  }
});
```

## User Registration Flow

1. User signs up via Clerk
2. Clerk webhook fires `user.created` event
3. Webhook handler calls `ensureUserExists` mutation
4. Mutation creates user in Convex with default role `business_owner`
5. Audit log entry created: `USER_REGISTERED`

## Role Assignment Flow

1. Admin calls `updateUserRole` mutation
2. `assertAuthorized` verifies admin role
3. User role updated in database
4. Audit log entry created: `USER_ROLE_CHANGED` with previous/new states

## Anti-Escalation Protection

Any unauthorized access attempt triggers:
1. Audit log entry: `UNAUTHORIZED_ACCESS_ATTEMPT` or `UNAUTHORIZED_ROLE_ESCALATION_ATTEMPT`
2. Error thrown: "Unauthorized: Insufficient Permissions"
3. No state mutation occurs

## File Structure

```
project/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── webhooks/clerk/       # Clerk webhook handler
│   │   └── sync-user/            # Manual user sync endpoint
│   ├── sign-in/                  # Sign-in page
│   ├── sign-up/                  # Sign-up page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                  # Home page
│   └── providers.tsx             # Client-side providers
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema
│   ├── accessControl.ts          # RBAC utilities
│   ├── audit.ts                  # Audit logging helper
│   ├── users.ts                  # User mutations/queries
│   ├── auth.config.js            # Convex auth config
│   └── _generated/               # Auto-generated types
├── lib/
│   └── convex-client.ts         # Convex React client
├── proxy.ts                     # Clerk middleware (clerkMiddleware)
└── package.json
```

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key
- `NEXT_PUBLIC_CONVEX_URL`: Convex deployment URL
- `CONVEX_DEPLOYMENT_KEY`: Convex deployment key (auto-generated)
- `WEBHOOK_SECRET`: Clerk webhook signing secret

## Testing RBAC

To test RBAC enforcement:

1. Create a test user with role `business_owner`
2. Try calling `updateUserRole` mutation
3. Should fail with "Unauthorized: Only admins can change user roles"
4. Check `audit_logs` table for `UNAUTHORIZED_ROLE_ESCALATION_ATTEMPT` entry

## Monitoring & Observability

### Audit Log Queries

```typescript
// Get all role changes
const roleChanges = await ctx.db
  .query("audit_logs")
  .withIndex("by_entityId", (q) => q.eq("entityId", userId))
  .filter((q) => q.eq(q.field("action"), "USER_ROLE_CHANGED"))
  .collect();

// Get unauthorized access attempts
const unauthorizedAttempts = await ctx.db
  .query("audit_logs")
  .filter((q) => 
    q.or(
      q.eq(q.field("action"), "UNAUTHORIZED_ACCESS_ATTEMPT"),
      q.eq(q.field("action"), "UNAUTHORIZED_ROLE_ESCALATION_ATTEMPT")
    )
  )
  .collect();
```

## Next Steps

- Module 2: Business Verification
- Module 3: Investment Matching
- Module 4: Escrow & Payments

