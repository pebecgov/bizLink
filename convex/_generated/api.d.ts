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
import type * as debug from "../debug.js";
import type * as investorActions from "../investorActions.js";
import type * as matching from "../matching.js";
import type * as onboarding from "../onboarding.js";
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
  debug: typeof debug;
  investorActions: typeof investorActions;
  matching: typeof matching;
  onboarding: typeof onboarding;
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
