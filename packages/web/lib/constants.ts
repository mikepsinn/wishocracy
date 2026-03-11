/**
 * LocalStorage key constants
 * ALWAYS use these constants instead of string literals
 */
export const STORAGE_KEYS = {
  SIGNUP_NAME: "signup_name",
  SIGNUP_REFERRAL: "signup_referral",
  PENDING_VOTE: "pendingVote",
  MILITARY_ALLOCATION: "militaryAllocation",
  PENDING_ORGANIZATION: "pendingOrganization",
  PENDING_WISHOCRACY: "pendingWishocracy",
  SIGNUP_SUBSCRIBE: "signup_subscribe",
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

/**
 * Page element IDs for navigation
 */
export const REFERENDUM_FORM_ID = "vote"

/**
 * Social sharing constants
 * Use these for all share text across the application
 */
export const SHARE_TEXT = {
  /** Default share text */
  DEFAULT: "I just mapped my priorities on Wishocracy. Compare yours.",
  /** Landing page share text (more descriptive, educational) */
  LANDING: "I just mapped my priorities on Wishocracy. Compare yours.",
  /** Default hashtags for social sharing */
  HASHTAGS: "Wishocracy,PublicPriorities,CollectiveChoice",
  /** Email subject fallback */
  EMAIL_SUBJECT: "Compare your priorities on Wishocracy",
  /** Email body fallback (when no text provided) */
  EMAIL_BODY_FALLBACK: (url: string) => `Compare your priorities on Wishocracy: ${url}`,
} as const

/**
 * Email configuration constants
 * Use these for all email-related configuration
 */
export const EMAIL_CONFIG = {
  /** Fallback email address when EMAIL_FROM_ADDRESS env var is not set */
  DEFAULT_FROM_ADDRESS: "hello@wishocracy.org",
  /** Default display name when EMAIL_FROM_NAME env var is not set */
  DEFAULT_FROM_NAME: "Wishocracy",
} as const
