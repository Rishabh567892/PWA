// Name of the cache
const CACHE_NAME = "pwa-cache-v1";

// Files that always exist
const APP_SHELL = [
  "/",
  "/manifest.json",
  "/web-app-manifest-96x96.png",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png"
];

// Install event → cache base files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Activate → cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch handler → offline-first strategy
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET requests (avoid breaking POST/PUT/etc.)
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache Vite build assets automatically
          if (request.url.includes("/assets/")) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          // If offline and cannot fetch → return fallback
          if (request.destination === "document") {
            return caches.match("/");
          }
        });
    })
  );
});
