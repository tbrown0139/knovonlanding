const CACHE_NAME = 'knovon-cache-v3';
const urlsToCache = [
    '/', // Main page
    '/index.html', // Assuming this is the page name
    '/offline.html', // Offline fallback page
    '/manifest.json', // Manifest file
    '/sw.js', // Service worker file
    'https://ok12static.oktacdn.com/fs/bco/1/fs0ieyg1efEWrp7oR5d7', // Knovon logo
    'https://mytab.knovon.net/intricate-explorer-0wyWY_aJJEE-unsplash.jpg', // Default image
    'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png', // Gmail icon
    'https://www.zoho.com/images/zmail/zmail-icon.png', // Zoho Mail icon
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', // GitHub icon
    'https://static.canva.com/static/images/favicon.png', // Canva icon
    'https://chat.openai.com/favicon-32x32.png', // ChatGPT icon
    // Other app icons
    'https://images.rbxcdn.com/1a4c10a1db0d50d69c5d381c5f880766.png', // Roblox icon
    'https://static-assets.bamgrid.com/product/disneyplus/images/logos/brand-lagoon-logo.d5955f43e8312f6939bd3a35deebd0ea.svg' // Disney Plus icon
];

self.addEventListener('install', event => {
    // Perform the install steps
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
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).catch(() => {
                    // If the network is unavailable, serve the offline page
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
