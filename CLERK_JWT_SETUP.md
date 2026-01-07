# Clerk JWT Template Setup for Convex

## Why You Need This

Convex needs a JWT token from Clerk to authenticate users. You must create a JWT template in Clerk that Convex can use.

## Setup Steps

1. **Go to Clerk Dashboard**
   - Navigate to [Clerk Dashboard](https://dashboard.clerk.com)
   - Select your application

2. **Create JWT Template**
   - Go to **JWT Templates** in the sidebar
   - Click **+ New template**
   - Name it: `convex` (exactly this name - it's referenced in `app/providers.tsx`)
   - Click **Create**

3. **Configure the Template**
   - **Token lifetime**: Default (1 hour) is fine
   - **Signing algorithm**: RS256 (default)
   - **Claims**: You can leave defaults or customize:
     ```json
     {
       "sub": "{{user.id}}",
       "email": "{{user.primary_email_address}}"
     }
     ```

4. **Copy the Issuer URL**
   - In the template settings, you'll see the **Issuer URL**
   - Format: `https://<your-clerk-domain>.clerk.accounts.dev`
   - Copy this value
   - Add it to your `.env.local` as `CLERK_ISSUER_URL`

5. **Verify in Code**
   - The template name "convex" is used in `app/providers.tsx`:
     ```typescript
     const token = await getToken({ template: "convex" });
     ```
   - The issuer URL is used in `convex/auth.config.js`

## Verification

After setup:
1. Sign in to your app
2. Check browser DevTools → Network tab
3. Look for requests to Convex
4. Verify the `Authorization` header contains a JWT token
5. Check Convex logs - `ctx.auth.getUserIdentity()` should return user identity

## Troubleshooting

### "Unauthenticated: No user identity found"

1. **Check template name**: Must be exactly `"convex"` (case-sensitive)
2. **Check issuer URL**: Must match in both:
   - Clerk Dashboard → JWT Template → Issuer URL
   - `.env.local` → `CLERK_ISSUER_URL`
   - `convex/auth.config.js` → `domain` field
3. **Verify token is being fetched**: Check `app/providers.tsx` uses `getToken({ template: "convex" })`
4. **Check Convex logs**: Run `npx convex dev` and check for auth errors

### Token not being generated

- Ensure user is signed in via Clerk
- Check Clerk Dashboard → Users to verify user exists
- Verify `useAuth()` hook is working (check browser console)

