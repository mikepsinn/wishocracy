import { STORAGE_KEYS, type StorageKey } from "./constants"

type PendingWishocracyState = {
  comparisons: Array<{
    categoryA: string
    categoryB: string
    allocationA: number
    allocationB: number
    timestamp: string
  }>
  currentPairIndex: number
  shuffledPairs: Array<[string, string]>
  selectedCategories?: string[]
  startedAt?: string
}

function getStorageItem<T>(key: StorageKey): T | null {
  if (typeof window === "undefined") return null

  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch {
    return null
  }
}

function setStorageItem<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage write failures so the comparison flow keeps working.
  }
}

function removeStorageItem(key: StorageKey): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore storage remove failures for the same reason.
  }
}

function getStringItem(key: StorageKey): string | null {
  if (typeof window === "undefined") return null

  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function getBooleanItem(key: StorageKey): boolean | null {
  const value = getStringItem(key)
  if (value === null) return null
  return value === "true"
}

function setStringItem(key: StorageKey, value: string): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore storage write failures so the comparison flow keeps working.
  }
}

function setBooleanItem(key: StorageKey, value: boolean): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, String(value))
  } catch {
    // Ignore storage write failures so the comparison flow keeps working.
  }
}

export const storage = {
  getSignupName: () => getStringItem(STORAGE_KEYS.SIGNUP_NAME),
  setSignupName: (name: string) => setStringItem(STORAGE_KEYS.SIGNUP_NAME, name),

  getSignupReferral: () => getStringItem(STORAGE_KEYS.SIGNUP_REFERRAL),
  setSignupReferral: (code: string) => setStringItem(STORAGE_KEYS.SIGNUP_REFERRAL, code),

  getSignupSubscribe: () => getBooleanItem(STORAGE_KEYS.SIGNUP_SUBSCRIBE),
  setSignupSubscribe: (subscribe: boolean) => setBooleanItem(STORAGE_KEYS.SIGNUP_SUBSCRIBE, subscribe),

  clearSignupData: () => {
    removeStorageItem(STORAGE_KEYS.SIGNUP_NAME)
    removeStorageItem(STORAGE_KEYS.SIGNUP_REFERRAL)
    removeStorageItem(STORAGE_KEYS.SIGNUP_SUBSCRIBE)
  },

  getPendingWishocracy: () => getStorageItem<PendingWishocracyState>(STORAGE_KEYS.PENDING_WISHOCRACY),
  setPendingWishocracy: (data: PendingWishocracyState) =>
    setStorageItem(STORAGE_KEYS.PENDING_WISHOCRACY, data),
  removePendingWishocracy: () => removeStorageItem(STORAGE_KEYS.PENDING_WISHOCRACY),
}
