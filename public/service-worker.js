importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js'
);

const VEHICLES_API_CACHE_KEY = 'decoded-vins-v2';
workbox.core.setCacheNameDetails({
  prefix: 'decoded-vins',
  suffix: 'v2',
});

// precache the application's home page and offline data
workbox.precaching.precache([
  '/VIN-Decoder/',
  '/VIN-Decoder/offline/decoder-values.json',
]);

// cache any page a user visits
workbox.routing.registerRoute(
  /.*(\/|\.htm|\.html)$/i,
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// cache any static assets used by the application
workbox.routing.registerRoute(
  /.*(\.js|\.css|\.png|\.ttf|\.woff2)$/i,
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// cache any data returned by the vPIC API
const VEHICLES_API_URI = new RegExp(
  'https://vpic.nhtsa.dot.gov/api/vehicles/*'
);
workbox.routing.registerRoute(
  VEHICLES_API_URI,
  workbox.strategies.cacheFirst({
    cacheName: VEHICLES_API_CACHE_KEY,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      // limit caching to 50 records and 30 days
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // sec * min * hour * day
      }),
    ],
  })
);

// respond with precached data when the vPIC API is unreachable
workbox.routing.setCatchHandler(({event}) => {
  if (VEHICLES_API_URI.test(event.request.url))
    return caches.match('/VIN-Decoder/offline/decoder-values.json');
});
