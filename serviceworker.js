importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.core.setCacheNameDetails({
	prefix: "vin-decoder",
	suffix: "v1",
	precache: "cache",
	runtime: "cache"
});

workbox.precaching.precacheAndRoute([
	"/",
	"./offline/decode.json"
]);

// cache HTML for offline use
workbox.routing.registerRoute(
	/(\/|\.html|\.htm)$/,
	workbox.strategies.networkFirst(),
);

// cache static content like JS and CSS for faster (or offline) use
workbox.routing.registerRoute(
	/.*\.(?:js|css)$/,
	workbox.strategies.cacheFirst({
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			})
		]
	}),
);

// cache fonts for offline use
workbox.routing.registerRoute(
	new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
	workbox.strategies.cacheFirst(),
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
					maxAgeSeconds: 60 * 60 * 24, // Only cache for a day
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
