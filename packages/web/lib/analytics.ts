declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

type EventParams = Record<string, string | number | boolean | undefined>

export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined" || !window.gtag) {
    return
  }

  window.gtag("event", eventName, params)
}

export function trackSignUp(params: { method: string }): void {
  trackEvent("sign_up", { method: params.method })
}

export function trackShare(params: {
  method: string
  contentType: string
  itemId?: string
}): void {
  trackEvent("share", {
    method: params.method,
    content_type: params.contentType,
    item_id: params.itemId,
  })
}

export function trackCopyLink(params: {
  contentType: string
  url?: string
}): void {
  trackEvent("copy_link", {
    content_type: params.contentType,
    url: params.url,
  })
}
