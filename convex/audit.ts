import { MutationCtx } from "./_generated/server";

export interface AuditLogParams {
  actorId: string;
  action: string;
  entityId?: string;
  previousState?: string;
  newState?: string;
  metadata?: Record<string, any>;
}

/**
 * Global audit logging helper
 * Mandate: Every critical action and state transition MUST emit an audit event.
 * If it is not logged, it did not happen.
 */
export async function emitAuditLog(
  ctx: MutationCtx,
  params: AuditLogParams
) {
  const timestamp = Date.now();

  await ctx.db.insert("audit_logs", {
    actorId: params.actorId,
    action: params.action,
    entityId: params.entityId,
    previousState: params.previousState,
    newState: params.newState,
    metadata: params.metadata || {},
    timestamp,
  });

  return timestamp;
}

