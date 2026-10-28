/**
 * Service Worker - Catálogo de Balcão (Grampos & Miudezas)
 * Estratégia Offline-First:
 * - Navegação / HTML: Network-first com cache fallback (garante atualizações instantâneas e offline 100%)
 * - Ativos estáticos (JS, CSS, WebP, Fontes, Seed JSON): Cache-first com cache dinâmico em runtime
 * - Imagens não encontradas: Fallback suave para placeholder.webp
 */

const CACHE_NAME = 'balcao-miudezas-v2';

const STATIC_PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.png',
  './catalog-master-seed.json',
  './catalog-images/placeholder.webp',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Navegação (HTML principal): Network-First com Cache Fallback
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // 2. Recursos Estáticos, Imagens e Dados (Cache-First com Network Fallback e Cache Dinâmico)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Permite salvar respostas válidas e opacas (ex: Google Fonts)
          if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // Fallback para imagens ausentes em modo 100% offline
          if (event.request.destination === 'image' || url.pathname.match(/\.(webp|png|jpg|jpeg|svg|gif)$/i)) {
            return caches.match('./catalog-images/placeholder.webp');
          }
        });
    })
  );
});
