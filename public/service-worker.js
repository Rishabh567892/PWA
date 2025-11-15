// public/service-worker.js

// DO NOT import workbox here.
// Workbox injectManifest will rewrite this file and insert the real import
// plus __WB_MANIFEST at build time.

// Placeholder for Workbox to inject precache manifest
self.__WB_MANIFEST;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Offline navigation fallback
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html"))
    );
  }
});
