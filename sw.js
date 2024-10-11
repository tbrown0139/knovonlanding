const CACHE_NAME = 'knovon-cache-v1';
const OFFLINE_URL = 'offline.html';
const DEFAULT_IMAGE_URL = 'https://your-default-image-url.com/default-image.jpg'; // Replace with your default image

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                OFFLINE_URL,
                DEFAULT_IMAGE_URL,
                // Add other assets you want to cache (CSS, logo, etc.)
                'https://ok12static.oktacdn.com/fs/bco/1/fs0ieyg1efEWrp7oR5d7' // Knovon logo
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response if found, else fetch from network
            return response || fetch(event.request).catch(() => {
                // If offline and request is for an image, serve the default image
                if (event.request.destination === 'image') {
                    return caches.match(DEFAULT_IMAGE_URL);
                }
                // Serve the offline page for other requests
                return caches.match(OFFLINE_URL);
            });
        })
    );
});
