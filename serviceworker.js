importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.core.setCacheNameDetails({
	prefix: "vin-decoder",
	suffix: "v1",
	precache: "cache",
	runtime: "cache"
});

workbox.precaching.precacheAndRoute([
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

workbox.routing.registerRoute(
	"https://cdn.jsdelivr.net/npm/bootswatch@4.1.1/dist/yeti/bootstrap.css",
	function (event) {
		console.log(event);
		let routeHandler = workbox.strategies.cacheFirst();

		let response = new Response(event.url.href.replace("yeti", getTheme()));

		routeHandler.handle(response);
	}
);

function getTheme() {
	var userAgent = navigator.userAgent;

	if (userAgent.indexOf("Mac OS") > -1 ||
		userAgent.indexOf("Macintosh") > -1 ||
		userAgent.indexOf("iPad") > -1 ||
		userAgent.indexOf("iPhone") > -1) {
		// Mac OS or iOS
		return "litera";
	} else if (userAgent.indexOf("Windows") > -1) {
		// Windows
		return "cosmo";
	} else if (userAgent.indexOf("Android") > -1) {
		// Android
		return "materia";
	} else if (userAgent.indexOf("Linux") > -1) {
		// Linux
		return "united";
	}

	// default theme
	return "yeti";
}