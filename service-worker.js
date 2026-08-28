const CACHE_NAME="kollaudierung-v6.4-shell-1";
const APP_SHELL=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];
const EXTERNAL_LIBS=[
  "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
];

self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    // Best effort: make Excel/PDF libraries available offline after installation.
    for(const url of EXTERNAL_LIBS){
      try{
        const res=await fetch(url,{mode:"no-cors",cache:"reload"});
        await cache.put(url,res);
      }catch(e){}
    }
    self.skipWaiting();
  })());
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;

  const url=new URL(req.url);
  const isExternalLib=EXTERNAL_LIBS.includes(req.url);

  if(isExternalLib){
    event.respondWith((async()=>{
      const cached=await caches.match(req.url);
      if(cached)return cached;
      try{
        const res=await fetch(req);
        const cache=await caches.open(CACHE_NAME);
        cache.put(req.url,res.clone()).catch(()=>{});
        return res;
      }catch(e){
        return cached || Response.error();
      }
    })());
    return;
  }

  if(url.origin===self.location.origin){
    event.respondWith((async()=>{
      const cached=await caches.match(req);
      if(cached){
        fetch(req).then(async res=>{
          if(res && res.ok){
            const cache=await caches.open(CACHE_NAME);
            cache.put(req,res.clone()).catch(()=>{});
          }
        }).catch(()=>{});
        return cached;
      }
      try{
        const res=await fetch(req);
        if(res && res.ok){
          const cache=await caches.open(CACHE_NAME);
          cache.put(req,res.clone()).catch(()=>{});
        }
        return res;
      }catch(e){
        if(req.mode==="navigate"){
          return (await caches.match("./index.html")) || Response.error();
        }
        throw e;
      }
    })());
  }
});
