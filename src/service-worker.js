// service-worker.js

const SYSTEM_VERSION = 'aeem-core-v2';

// Only pre-cache the absolute bare minimum shell. 
// Everything else will be cached dynamically as the user explores.
const CORE_ASSETS = [
  '/',
  '/index.html',
  // Note: Add your main CSS/JS entry points here if they are static, 
  // otherwise the dynamic cache strategy below will catch them.
];

// ============================================================================
// 1. INSTALLATION: Pre-cache core shell & take control immediately
// ============================================================================
self.addEventListener('install', (e) => {
  // skipWaiting forces the waiting service worker to become the active service worker.
  self.skipWaiting();
  
  e.waitUntil(
    caches.open(SYSTEM_VERSION).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
});

// ============================================================================
// 2. ACTIVATION: Purge old memory & claim clients
// ============================================================================
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== SYSTEM_VERSION)
          .map((name) => caches.delete(name)) // Ruthlessly delete old versions
      );
    }).then(() => self.clients.claim()) // Immediately control all open tabs
  );
});

// ============================================================================
// 3. FETCH INTERCEPTION: Smart Routing Strategies
// ============================================================================
self.addEventListener('fetch', (e) => {
  const req = e.request;

  // Bypass the service worker entirely for external APIs, analytics, or POST requests.
  if (!req.url.startsWith(self.location.origin) || req.method !== 'GET') {
    return;
  }

  // Strategy A: Navigation Requests (HTML) -> Network First, Fallback to Cache
  // Ensures the user always gets the freshest app shell if online.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          // Clone and cache the fresh HTML
          const resClone = res.clone();
          caches.open(SYSTEM_VERSION).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => {
          // If offline, serve the cached index.html so React Router can take over
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Strategy B: Static Assets (JS, CSS, Images) -> Cache First, Fallback to Network
  // Ensures zero latency for UI components.
  e.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) {
        return cachedRes;
      }
      
      // If not in cache, fetch it, then cache it for next time (Dynamic Caching)
      return fetch(req).then((networkRes) => {
        // Don't cache opaque responses or errors
        if (!networkRes || networkRes.status !== 200 || networkRes.type !== 'basic') {
          return networkRes;
        }

        const resClone = networkRes.clone();
        caches.open(SYSTEM_VERSION).then((cache) => {
          cache.put(req, resClone);
        });

        return networkRes;
      });
    })
  );
});