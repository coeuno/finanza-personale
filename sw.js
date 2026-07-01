const CACHE = 'finanza-v7';
const ASSETS = ['./index.html', './manifest.json', './config.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Le richieste verso altri domini (es. Google Apps Script) NON vengono
  // intercettate: lasciamo che il browser le gestisca normalmente.
  // Così il redirect di Apps Script funziona sia per fetch che per JSONP.
  if (url.origin !== self.location.origin) {
    return; // non chiamiamo respondWith -> richiesta gestita dal browser
  }

  // Per i file dell'app (stesso dominio): prova la rete, se fallisce usa la cache.
  // Non restituiamo mai null: se non c'è né rete né cache, diamo una risposta vuota.
  e.respondWith(
    fetch(e.request)
      .then(resp => resp)
      .catch(() => caches.match(e.request).then(cached => {
        return cached || Response.error();
      }))
  );
});
