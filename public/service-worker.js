// service-worker.js (source)

// 1. Import Workbox *at the top*
import { precacheAndRoute } from "workbox-precaching";

// 2. Precache all Vite-generated build files
// Workbox replaces __WB_MANIFEST automatically during build
precacheAndRoute(self.__WB_MANIFEST);

// 3. Install event: activate immediately
self.addEventListener("install", event => {
  self.skipWaiting();
});

// 4. Activate event: take control of all pages
self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

// 5. Offline fallback for SPA navigation
self.addEventListener("fetch", event => {
  // For navigation requests only
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html"))
    );
  }
});
