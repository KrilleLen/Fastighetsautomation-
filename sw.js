const CACHE='kundradarn-shell-c3d44a6';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg',...Array.from({length:8},(_,i)=>`./deploy-payload/part${String(i).padStart(2,'0')}`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('kundradarn-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):undefined)))});
