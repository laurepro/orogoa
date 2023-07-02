const CACHE_NAME = `orogoa-v0.1.0`;

// Use the install event to pre-cache all initial ressources.
self.addEventListener('install', event => {
	event.waitUntil((async () => {
		const cache = await caches.open(CACHE_NAME);
		cache.addAll(['/']);
	})());
});

self.addEventListener('fetch', event => {
	event.respondWith((async () => {
		const cache = await caches.open(CACHE_NAME);
		// network forcing for shom script
		if (event.request.url == 'https://services.data.shom.fr/hdm/vignette/grande/FROMENTINE_EMBARCADERE?locale=fr') {
			try {
				const fetchResponse = await fetch(event.request);
				return fetchResponse;
			} catch (e) {
				// if network error try to get from cache
			}
		}
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