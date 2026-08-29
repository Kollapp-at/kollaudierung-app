const CACHE = "kollaudierung-v6.73-shell-1";
const RUNTIME = "kollaudierung-v6.73-runtime-1";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE && k !== RUNTIME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);

  /* Navigation: prefer fresh GitHub version, fall back to cached app. */
  if(req.mode === "navigate"){
    event.respondWith(
      fetch(new Request(req,{cache:"no-store"}))
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(()=>{});
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  /* App shell: cache-first. */
  if(url.origin === self.location.origin){
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
        return res;
      }))
    );
    return;
  }

  /* CDN libraries: stale-while-revalidate. This makes the already-loaded
     PDF/Excel libraries available during later offline construction use. */
  event.respondWith(
    caches.match(req).then(hit => {
      const network = fetch(req).then(res => {
        if(res && (res.ok || res.type === "opaque")){
          const copy=res.clone();
          caches.open(RUNTIME).then(c=>c.put(req,copy)).catch(()=>{});
        }
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});


self.addEventListener("message", event => {
  if(event.data && event.data.type === "SKIP_WAITING"){
    self.skipWaiting();
  }
});
