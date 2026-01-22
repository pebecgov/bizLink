/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accessControl from "../accessControl.js";
import type * as adminVerification from "../adminVerification.js";
import type * as audit from "../audit.js";
import type * as bootstrap from "../bootstrap.js";
import type * as businessProfile from "../businessProfile.js";
import type * as concierge from "../concierge.js";
import type * as connections from "../connections.js";
import type * as debug from "../debug.js";
import type * as investorActions from "../investorActions.js";
import type * as matching from "../matching.js";
import type * as messages from "../messages.js";
import type * as notifications from "../notifications.js";
import type * as onboarding from "../onboarding.js";
import type * as seed from "../seed.js";
import type * as seed_all_mdas from "../seed_all_mdas.js";
import type * as users from "../users.js";
import type * as verificationScore from "../verificationScore.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  accessControl: typeof accessControl;
  adminVerification: typeof adminVerification;
  audit: typeof audit;
  bootstrap: typeof bootstrap;
  businessProfile: typeof businessProfile;
  concierge: typeof concierge;
  connections: typeof connections;
  debug: typeof debug;
  investorActions: typeof investorActions;
  matching: typeof matching;
  messages: typeof messages;
  notifications: typeof notifications;
  onboarding: typeof onboarding;
  seed: typeof seed;
  seed_all_mdas: typeof seed_all_mdas;
  users: typeof users;
  verificationScore: typeof verificationScore;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
