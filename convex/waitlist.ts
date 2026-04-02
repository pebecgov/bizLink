import { mutation } from "./_generated/server";
import { v } from "convex/values";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const joinWaitlist = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    if (!email) {
      throw new Error("Email is required");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Invalid email");
    }

    const existing = await ctx.db
      .query("waitlist_entries")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      return { alreadyRegistered: true, _id: existing._id };
    }

    const id = await ctx.db.insert("waitlist_entries", {
      email,
      createdAt: Date.now(),
    });

    return { alreadyRegistered: false, _id: id };
  },
});

