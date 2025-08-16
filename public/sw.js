const cacheName = "peteretelej-v1";

const staticAssets = [
  "/",
  "/favicon.ico", 
  "/favicon.svg",
  "/fonts/atkinson-regular.woff",
  "/fonts/atkinson-bold.woff",
  "/images/pic.png",
  "/images/etelej_avatar_small.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  
  event.respondWith(
    fetch(event.request).then(function(fetchResponse) {
      const responseClone = fetchResponse.clone();
      caches.open(cacheName).then(function(cache) {
        cache.put(event.request, responseClone);
      });
      return fetchResponse;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});