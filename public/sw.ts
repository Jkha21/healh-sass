/// <reference lib="webworker" />
/* ═══════════════════════════════════════════════════════════
   HealthSaaS — Service Worker  (src/sw.ts)
   Build output → public/sw.js

   Add to next.config.ts:
     import withSerwist from "@serwist/next";   // or build manually
   Or compile with:
     npx esbuild src/sw.ts --bundle --outfile=public/sw.js \
       --platform=browser --format=iife
   ═══════════════════════════════════════════════════════════ */

declare const self: ServiceWorkerGlobalScope;

const CACHE = "healthsaas-v1";

/* ─── Push payload shape ─────────────────────────────────── */
interface PushPayload {
  title: string;
  body:  string;
  type:  "urgent" | "warning" | "info" | "success";
  url:   string;
}

/* ─── Install ────────────────────────────────────────────── */
self.addEventListener("install", (e: ExtendableEvent) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(["/"]).catch(() => {}))
  );
  self.skipWaiting();
});

/* ─── Activate ───────────────────────────────────────────── */
self.addEventListener("activate", (e: ExtendableEvent) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

/* ─── Fetch: network-first, fallback to cache ────────────── */
self.addEventListener("fetch", (e: FetchEvent) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request) as Promise<Response>)
  );
});

/* ─── Push ───────────────────────────────────────────────── */
self.addEventListener("push", (e: PushEvent) => {
  const defaults: PushPayload = {
    title: "HealthSaaS",
    body:  "You have a new notification.",
    type:  "info",
    url:   "/dashboard",
  };

  let payload: PushPayload = { ...defaults };

  if (e.data) {
    try { payload = { ...defaults, ...e.data.json() }; }
    catch { payload.body = e.data.text(); }
  }

  const options: NotificationOptions = {
    body:    payload.body,
    icon:    "/icons/icon-192.png",
    badge:   "/icons/badge-72.png",
    tag:     `healthsaas-${payload.type}`,
    data:    { url: payload.url } satisfies Record<string, string>,
    vibrate: [200, 100, 200],
    // @ts-expect-error — requireInteraction is valid but not in all TS lib versions
    requireInteraction: payload.type === "urgent",
    actions: [
      { action: "view",    title: "View"    },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  e.waitUntil(self.registration.showNotification(payload.title, options));
});

/* ─── Notification click ─────────────────────────────────── */
self.addEventListener("notificationclick", (e: NotificationEvent) => {
  e.notification.close();
  if (e.action === "dismiss") return;

  const target: string = (e.notification.data as { url?: string })?.url ?? "/dashboard";

  e.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList: readonly WindowClient[]) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.focus();
            client.postMessage({ type: "SW_NAV", url: target });
            return;
          }
        }
        if (self.clients.openWindow) return self.clients.openWindow(target);
      })
  );
});

export {};