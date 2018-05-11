importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

// cache HTML pages for offline use
workbox.routing.registerRoute(
	/\.(?:html|htm)$/,
	workbox.strategies.networkFirst({
		cacheName: "dynamic-resources",
	}),
);

// cache static content like JS and CSS for faster / offline use
workbox.routing.registerRoute(
	/\.(?:js|css)$/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: "static-resources",
	}),
);

workbox.routing.registerRoute(
	new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
	workbox.strategies.cacheFirst({
		cacheName: "static-fonts"
	}),
);

workbox.routing.registerRoute(
	new RegExp("https://vpic.nhtsa.dot.gov/api/*"),
	workbox.strategies.networkFirst({
		cacheName: "decoded-VINs",
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24, // Only cache for a day
				maxEntries: 5 // Only cache 5 VINs
			}),
		]
	})
);

// apply theme
self.addEventListener("fetch", async (event) => {
	let requestEvent = event.request;

	if (event.request.url === "https://cdn.jsdelivr.net/npm/bootswatch@4.1.1/dist/yeti/bootstrap.css") {
		requestEvent = new Request(event.request.url.replace("yeti", getTheme()));
	}

	return event.respondWith(fetch(requestEvent));
});

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