const fileList = [
  '/alchemy/',
  '/alchemy/i18n.js',
  '/alchemy/items.js',
  '/alchemy/simulator.js',
  '/alchemy/mobile.js',
  '/alchemy/filter.js',
  '/alchemy/tabcontrol.js',
  '/alchemy/info.js',
  '/alchemy/803.js',
  '/alchemy/styles.css',
  '/alchemy/items.css',
  '/alchemy/favicon.ico',
  '/alchemy/names.json',
  '/alchemy/materials.json',
  '/alchemy/equips.json',
  '/alchemy/templets.json',
  '/alchemy/sprite-min.png',
  '/alchemy/bgp1_chs.png',
  '/alchemy/bgp4.png',
  '/alchemy/hr.png',
  '/alchemy/material_chs.png',
  '/alchemy/equip_chs.png',
  '/alchemy/sim_chs.png',
  '/alchemy/empty.png',
  '/alchemy/toggle.png',
  '/alchemy/gold.png',
  'https://cdnjs.loli.net/ajax/libs/jquery/1.11.1/jquery.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cached').then((cache) => {
      return cache.addAll(fileList);
    })
  );
});

self.addEventListener('fetch', (event) => {
  let url = new URL(event.request.url);
  if (url.pathname === '/alchemy/') {
    setTimeout(() => caches.open('cached').then((cache) => {
      return cache.addAll(fileList);
    }), 2000);
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
