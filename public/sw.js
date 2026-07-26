/* Amor del Fato service worker.
   App shell is precached; navigations are network-first with an offline
   fallback to the cached shell; hashed assets are cache-first. Bump VERSION
   on every deploy so old caches are purged and returning devices self-heal. */
const VERSION = 'adf-v8'
const SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/fonts/fonts.css',
  '/fonts/inter-400.woff2',
  '/fonts/inter-500.woff2',
  '/fonts/inter-600.woff2',
  '/fonts/inter-700.woff2',
  '/fonts/space-grotesk-600.woff2',
  '/fonts/space-grotesk-700.woff2',
  '/fonts/libre-baskerville-400.woff2',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // Navigations: network-first, fall back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html').then((r) => r || fetch('/'))),
    )
    return
  }

  // Everything else: cache-first, then network, caching successful responses.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              const copy = res.clone()
              caches.open(VERSION).then((cache) => cache.put(request, copy))
            }
            return res
          })
          .catch(() => cached),
    ),
  )
})
