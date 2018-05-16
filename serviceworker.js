importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.core.setCacheNameDetails({
	prefix: "vin-decoder",
	suffix: "v1"
});

workbox.precaching.precache([
	"/offline/decode.json"
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

workbox.routing.registerRoute(
	new RegExp("https://vpic.nhtsa.dot.gov/api/*"),
	({
		event
	}) => {
		let routeHandler = workbox.strategies.networkFirst({
			cacheName: "vin-decoder-cache-v1",
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200]
				}),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24, // one day
					maxEntries: 20
				}),
			]
		});

		return routeHandler.handle({
				event
			})
			.catch(() => {
				caches.match("offline/decode.json");
			});
	}
);
