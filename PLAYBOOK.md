# P-BID – FULL COMPREHENSIVE DEVELOPMENT PLAYBOOK

This document is the AUTHORITATIVE, end-to-end development guide for building the PEBEC Business–Investment Direct (P-BID) platform using Next.js (App Router), Convex, and Clerk.

## SECTION 0: NON-NEGOTIABLE ENGINEERING PRINCIPLES
- Convex is the single source of truth for business state.
- Clerk handles identity; authorization is enforced by your RBAC layer.
- All critical flows are explicit state machines.
- All critical actions emit audit events.
- Money never moves without verified state transitions.
- Admin and regulator actions are explicit, logged, and reversible only via audit.
- Blockchain is append-only proof, never primary storage.
- If it is not logged, it did not happen.

## SECTION 1: SYSTEM MODULE MAP
- Identity & Access Control Core
- Business Registry & Verification Core
- Investor Profiling & Matchmaking
- Deal Lifecycle Engine
- Escrow & Milestone Engine
- Regulatory & Compliance Workflows
- Dispute & Redress System
- Audit, Governance & Observability
- Market Intelligence & Analytics
- Subscriptions & Monetization
- Blockchain Proof Layer (Optional, Final Phase)

## SECTION 2: DAILY CODING CHECKLISTS (STRICT ORDER)

### Phase 0 – Foundation
- Initialize Next.js App Router project
- Configure Clerk (sign-up, sign-in, middleware protection)
- Initialize Convex project and schema
- Create RBAC permission map and helpers
- Create audit log table and emit helper
- Set environment variables and secrets
- Add basic error boundaries and logging

### Phase 1 – Identity & Users
- Create user schema mapped to Clerk IDs
- Implement ensureUserExists mutation
- Implement role assignment flow
- Block unauthorized role escalation
- Log authentication and role changes

### Phase 2 – Business Verification
- Create business schema and indexes
- Implement business onboarding (draft state)
- Implement document upload + hashing
- Implement verification state machine
- Admin review & approval flows
- Risk score calculation logic
- Emit verification audit events

### Phase 3 – Investors & Matching
- Create investor profile schema
- Capture preferences and risk tolerance
- Implement rule-based matchmaking
- Exclude unverified/suspended businesses
- Persist recommendation snapshots

### Phase 4 – Deal Lifecycle
- Implement deal schema and states
- Restrict deal visibility to participants
- Implement deal messaging
- Lock terms before contract signing
- Generate contract artifacts
- Emit deal lifecycle events

### Phase 5 – Escrow & Payments
- Create escrow and milestone schemas
- Integrate payment gateway
- Verify webhook signatures
- Ensure idempotent payment handling
- Milestone verification flow
- Controlled fund release logic
- Financial audit logging

### Phase 6 – Disputes & Redress
- Implement dispute schema
- Allow dispute filing at defined states
- SLA timers and escalation rules
- Admin/regulator resolution flow
- Immutable dispute history

### Phase 7 – Regulatory Workflows
- Country regulatory data models
- Application submission flows
- Clarification cycles
- Approval/rejection issuance
- Digital license records

### Phase 8 – Analytics & Governance
- Aggregate audit logs
- Admin dashboards
- Country/sector KPIs
- M&E reporting
- Read-only auditor access

## SECTION 3: CURSOR-READY PROMPTS (PASTE INTO IDE)

### Core RBAC Prompt
Generate a centralized RBAC utility for Convex that enforces role-based permissions, supports jurisdiction scoping, blocks privilege escalation, and emits audit logs for every denial.

### Business Verification Prompt
Generate Convex mutations and queries implementing a strict business verification state machine with document hashing, admin review, rejection reasons, and immutable audit logging.

### Deal Lifecycle Prompt
Generate Convex logic for a deal lifecycle engine with explicit states, permission checks, message scoping, and prevention of invalid transitions.

### Escrow & Payments Prompt
Generate escrow logic with milestone-based releases, idempotent payment webhooks, dual approval thresholds, and full financial audit logging.

### Dispute System Prompt
Generate a dispute management system with escalation rules, SLA timers, admin resolution, and non-destructive history tracking.

## SECTION 4: CONVEX MUTATION TEMPLATES

### Standard State Transition Template:
```javascript
mutation transitionState(entityId, expectedState, nextState) {
  assertAuthenticatedUser();
  assertAuthorized();
  assertCurrentState(entityId, expectedState);
  updateEntityState(entityId, nextState);
  emitAuditLog({
    entityId,
    from: expectedState,
    to: nextState,
    actor: currentUserId,
    timestamp: now()
  });
}
```

## SECTION 5: EDGE CASES & SECURITY GUARANTEES
- Race conditions on escrow release must be explicitly handled and logged
- Duplicate payment webhooks must be explicitly handled and logged
- Role spoofing attempts must be explicitly handled and logged
- State desynchronization between UI and backend must be explicitly handled and logged
- Regulator inactivity must be explicitly handled and logged
- Partial document uploads must be explicitly handled and logged
- Malicious dispute spam must be explicitly handled and logged

## SECTION 6: DEFINITION OF DONE (PER PHASE)

### Foundation
- RBAC enforced globally
- Audit logging operational
- No direct state mutation from UI

### Verification
- No unverified business visible to investors
- All verification actions logged
- Risk scores reproducible

### Deals & Escrow
- No funds released without milestone verification
- All financial actions auditable
- Disputes block releases

### Scale & Governance
- System observable under load
- Regulatory workflows tested
- Security review passed
