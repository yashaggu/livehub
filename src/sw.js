const CACHE = "live-lite-v1";
const ASSETS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  if (e.request.url.includes("googleapis.com") || e.request.url.includes("youtube.com")) {
    return; // Always fetch live streams & API status from network
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});