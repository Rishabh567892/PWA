// service-worker.js (source)

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  clients.claim();
});

// Workbox injects your file list here
// __WB_MANIFEST is replaced at build time
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
