const CACHE_NAME = 'aeem-static-v1'
const ASSETS = [
  '/',
  '/index.html'
]

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => res))
  )
})
