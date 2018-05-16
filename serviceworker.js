importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

const apiCacheName = "vin-decoder-api-v1";
workbox.core.setCacheNameDetails({
	prefix: "vin-decoder",
	suffix: "v1"
});

workbox.precaching.precache([
	"/rDuckDev/VIN-Decoder/v1.0.2/",
	"/rDuckDev/VIN-Decoder/v1.0.2/offline/decode.json"
]);

workbox.routing.registerRoute(
	/.*(\/|\.htm|\.html)$/i,
	workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
	/.*(\.js|\.css|\.ttf|\.woff2)$/i,
	workbox.strategies.cacheFirst({
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			})
		]
	}),
);

const apiURL = new RegExp("https://vpic.nhtsa.dot.gov/api/*");
workbox.routing.registerRoute(
	apiURL,
	workbox.strategies.staleWhileRevalidate({
		cacheName: apiCacheName,
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			}),
			new workbox.expiration.Plugin({
				maxEntries: 20,
				maxAgeSeconds: 60 * 60 * 24 // one day
			}),
		]
	})
);

workbox.routing.setCatchHandler(({event}) => {
	// respond with "app offline" message when API cannot be reached
	if (apiURL.test(event.request.url)) return caches.match("/rDuckDev/VIN-Decoder/v1.0.2/offline/decode.json");
});
