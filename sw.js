const CACHE_NAME = 'knovon-cache-v2';
const urlsToCache = [
    '/', // Main page
    '/index.html', // Assuming this is the page name
    '/offline.html', // Offline fallback page
    '/manifest.json', // Manifest file
    '/sw.js', // Service worker file
    'https://ok12static.oktacdn.com/fs/bco/1/fs0ieyg1efEWrp7oR5d7', // Knovon logo
    '/intricate-explorer-0wyWY_aJJEE-unsplash.jpg', // Default image
    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg', // Disney icon
    'https://upload.wikimedia.org/wikipedia/commons/4/45/New_Logo_Gmail.svg', // Gmail icon
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/Zoho-logo.png', // Zoho icon
    'https://upload.wikimedia.org/wikipedia/commons/6/6c/Roblox_Logo.svg' // Roblox icon
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached response if found, or fetch from the network
                return response || fetch(event.request).catch(() => {
                    // If request is for an HTML page and network fails, return offline page
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
