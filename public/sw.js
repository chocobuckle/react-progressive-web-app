const cacheName = 'product-hunt';

// Cache files.
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(['/', '/index.html', '/static/js/bundle.js']))
  );
});

// Intercept network requests to check if the URL being requested is the same as any of the
// currently cached files - if so, the cached file will be used instead of the remote file.
this.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    // eslint-disable-next-line consistent-return
    .then(response => {
      if (response) {
        return response;
      }
    })
  );
});
