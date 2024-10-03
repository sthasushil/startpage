const CACHE_VERSION = 'v2'; // Change this number for each update

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('offline-cache' + CACHE_VERSION).then(function(cache) {
      return cache.addAll([
        '/',
	      '/index.html',
        '/css/',
		'/css/*.css',
		'/js/main.js',
		'/dark-favicon-16x16.png',
		'/dark-favicon-32x32.png',
		'/dark-favicon-64x64.png',
		'/light-favicon-16x16.png',
		'/light-favicon-32x32.png',
		'/light-favicon-64x64.png',
		'/meroshare.png',
		'/nepsealpha.png'
        // Add more files here
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(networkResponse) {
          if (networkResponse) {
            caches.open('offline-cache' + CACHE_VERSION).then(function(cache) {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      }
    })
  );
});
