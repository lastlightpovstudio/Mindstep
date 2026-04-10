const CACHE='mindstep-v49';
const ASSETS=['/','/index.html','/manifest.json','/icon-192.png','/icon-512.png','/icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'||e.request.url.endsWith('/index.html')){
    e.respondWith(fetch(e.request).catch(()=>caches.match('/index.html')));
  }else{
    e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
  }
});
