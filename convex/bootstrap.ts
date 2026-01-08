import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addAdmin = mutation({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .unique();

        if (!user) {
            throw new Error("User with this email not found");
        }

        await ctx.db.patch(user._id, { role: "admin" });

        // simplified audit log for bootstrap
        await ctx.db.insert("audit_logs", {
            actorId: "system_bootstrap",
            action: "USER_PROMOTED_TO_ADMIN",
            entityId: user._id,
            previousState: user.role,
            newState: "admin",
            metadata: {
                email: args.email,
                method: "bootstrap_script"
            },
            timestamp: Date.now(),
        })

        return "User promoted to admin";
    },
});
