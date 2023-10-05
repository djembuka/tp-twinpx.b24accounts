const staticAssets = [
  '/',
  '/index.html',
  '/style.css',
  '/normalize.css',
  '/script.js',
  '/images/background.svg',
  '/icons/icon144.png',
  '/icons/icon192.png',
];

self.addEventListener('install', async (e) => {
  const cache = await caches.open('static-cache');
  await cache.addAll(staticAssets);
});

self.addEventListener('activate', async (e) => {});

self.addEventListener('fetch', async (e) => {});
