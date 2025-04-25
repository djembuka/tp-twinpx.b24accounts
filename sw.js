// Конфигурация
const CACHE_NAME = 'static-cache-v1';
const STATIC_FILES = [
  '/normalize.css',
  '/bitrix/templates/accounts/script.js',
  '/bitrix/templates/accounts/images/background-blur.png',
  '/bitrix/templates/accounts/images/background-mobile.png',
  '/bitrix/templates/accounts/images/background.png',
  '/icons/icon144.png',
  '/icons/icon192.png',
  '/bitrix/templates/accounts/pwa.js',
  '/bitrix/templates/accounts/template_styles.css',
  '/new_lk/manifest.json',
];

// Разрешенные расширения для кэширования
const ALLOWED_EXTENSIONS = [
  '.css',
  '.js',
  '.json',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.gif',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot', // Шрифты
];

// Установка - предварительное кэширование
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

// Активация - очистка старого кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Пропускаем не-GET запросы
  if (request.method !== 'GET') {
    return fetch(request);
  }

  // Пропускаем API-запросы
  if (url.pathname.startsWith('/api/')) {
    return fetch(request);
  }

  // Проверяем расширение файла
  const fileExtension = url.pathname.split('.').pop().toLowerCase();
  const isStaticFile = ALLOWED_EXTENSIONS.includes('.' + fileExtension);

  if (isStaticFile) {
    // Стратегия: Cache First для статики
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((response) => {
            // Кэшируем только успешные ответы
            if (response.ok) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          })
        );
      })
    );
  } else {
    // Для остальных файлов - Network Only
    return fetch(request);
  }
});
