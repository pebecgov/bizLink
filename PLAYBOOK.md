# P-BD – FULL COMPREHENSIVE DEVELOPMENT PLAYBOOK

This document is the AUTHORITATIVE, end-to-end development guide for building the PEBEC Business Directory (P-BD) platform using Next.js (App Router), Convex, and Clerk.

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
- Partnership & Networking Hub
- Regulatory & Compliance Workflows
- Audit, Governance & Observability
- Market Intelligence & Analytics
- Subscriptions & Monetization

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

### Phase 3 – Partnerships & Networking
- Create partnership request schema
- Capture preferences and networking needs
- Implement rule-based directory search
- Exclude unverified/suspended businesses
- Persist search configurations

### Phase 4 – Analytics & Governance
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
