/* Service worker do FixCell.

   Duas estratégias, e a diferença importa:

   NAVEGAÇÃO (o próprio HTML) vai de REDE PRIMEIRO. A página muda toda
   hora; servir do cache deixaria quem instalou preso numa versão velha
   sem jeito de sair. O cache aqui é só rede de segurança para quando
   não houver conexão.

   O RESTO vai de CACHE PRIMEIRO, porque ícone e fonte não mudam.

   Só guarda resposta de mesma origem e com status ok: a fonte do Google
   e o Lenis vêm de CDN e respondem opaco, que não dá para inspecionar —
   guardar isso encheria o cache de resposta possivelmente quebrada. */
const CACHE = 'fixcell-v1';
const CASCA = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  /* addAll é tudo-ou-nada: se um arquivo faltar, a instalação inteira
     falha e o SW nunca ativa. por isso cada um vai por conta própria. */
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(CASCA.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const chaves = await caches.keys();
    await Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const c = await caches.open(CACHE);
        c.put('./index.html', r.clone());
        return r;
      } catch {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const guardado = await caches.match(req);
    if (guardado) return guardado;
    const r = await fetch(req);
    if (r.ok && new URL(req.url).origin === location.origin) {
      const c = await caches.open(CACHE);
      c.put(req, r.clone());
    }
    return r;
  })());
});
