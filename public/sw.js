// StayFlow Service Worker - v3 (force update on new deploy)
const CACHE_NAME = 'stayflow-v3';
const STATIC_ASSETS = [
  '/',
];

// Install: cache static assets and immediately activate
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Ignore cache failures during install — don't block activation
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean ALL old caches aggressively
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: NETWORK-FIRST for everything.
// This prevents stale cached pages from being served on iOS Safari
// after a new Vercel deployment.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Supabase API calls - always go direct to network
  const url = new URL(request.url);
  if (url.hostname.includes('supabase')) return;

  // Network-first strategy for ALL requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
        }
        return response;
      })
      .catch(() => {
        // Network failed — try cache as fallback
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // Last resort: return the cached root page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          return undefined;
        });
      })
  );
});
