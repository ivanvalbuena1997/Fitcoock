/* FitCoock — service worker
   Sube el número de VERSION cada vez que cambies index.html:
   así el móvil se entera de que hay una versión nueva y descarta la antigua. */
const VERSION = "fitcoock-v1.2";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Peticiones a otros dominios (Open Food Facts): siempre a la red, sin cachear.
  if (new URL(req.url).origin !== self.location.origin) return;

  // La app: primero la caché, para que arranque sin conexión.
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) {
        // refresco en segundo plano para la próxima vez
        fetch(req).then(r => {
          if (r && r.ok) caches.open(VERSION).then(c => c.put(req, r.clone()));
        }).catch(() => {});
        return hit;
      }
      return fetch(req)
        .then(r => {
          if (r && r.ok) {
            const copia = r.clone();
            caches.open(VERSION).then(c => c.put(req, copia));
          }
          return r;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
