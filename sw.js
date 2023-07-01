const CACHE_NAME = `orogoa-v0.1.0`;

// Use the install event to pre-cache all initial ressources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/ressources/orogoa.js',
      '/ressources/orogoa.css',
      '/ressources/i18n.js',
      '/ressources/svg/car1.svg',
      '/ressources/svg/car2.svg',
      '/ressources/svg/car3.svg',
      '/ressources/svg/car4.svg',
      '/ressources/svg/car5.svg',
      '/ressources/svg/car6.svg',
      '/ressources/svg/de.svg',
      '/ressources/svg/es.svg',
      '/ressources/svg/fr.svg',
      '/ressources/svg/gb.svg',
      '/ressources/svg/arrow.svg'
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});