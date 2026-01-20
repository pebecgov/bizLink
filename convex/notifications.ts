import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Get all notifications for the current user
 */
export const getMyNotifications = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        return await ctx.db
            .query("notifications")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .order("desc")
            .collect();
    },
});

/**
 * Get unread notification count
 */
export const getUnreadCount = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return 0;

        const unread = await ctx.db
            .query("notifications")
            .withIndex("by_user_read", (q) => q.eq("userId", identity.subject).eq("isRead", false))
            .collect();

        return unread.length;
    },
});

/**
 * Mark a notification as read
 */
export const markAsRead = mutation({
    args: { notificationId: v.id("notifications") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const notification = await ctx.db.get(args.notificationId);
        if (!notification || notification.userId !== identity.subject) {
            throw new Error("Unauthorized");
        }

        await ctx.db.patch(args.notificationId, { isRead: true });
    },
});

/**
 * Mark all notifications as read
 */
export const markAllAsRead = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const unread = await ctx.db
            .query("notifications")
            .withIndex("by_user_read", (q) => q.eq("userId", identity.subject).eq("isRead", false))
            .collect();

        for (const note of unread) {
            await ctx.db.patch(note._id, { isRead: true });
        }
    },
});

/**
 * Mark notifications for a specific link as read
 */
export const markAsReadByLink = mutation({
    args: { link: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const unread = await ctx.db
            .query("notifications")
            .withIndex("by_user_read", (q) => q.eq("userId", identity.subject).eq("isRead", false))
            .collect();

        const targetNotes = unread.filter((n) => n.link === args.link);

        for (const note of targetNotes) {
            await ctx.db.patch(note._id, { isRead: true });
        }
    },
});
