var cacheName = 'v1';
var cacheFiles = [
	'./',
	'/static/css/style.css',
	'https://fonts.googleapis.com/css?family=Amiko',
	'/offline'
];

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Installed');

    // event.waitUntil Delays the event until the Promise is resolved
    event.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(

    // Going through all the keys and the cache
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);

});

self.addEventListener('fetch', function(event) {
	console.log('[ServiceWorker] Fetching', event.request.url);

	// event.respondWidth Responds to the fetch event
	event.respondWith(

		// Check in cache for the request being made
		caches.match(event.request)

			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", event.request.url, response);
					// Return the cached version
					return response;
				} else {
					return cache.match('/offline/');
				}

				// If the request is NOT in the cache, fetch and cache
				var requestClone = event.request.clone();
				fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open the cache
						caches.open(cacheName).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(event.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', event.request.url);

								// Return the response
								return response;

				    }); // end caches.open

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
						return cache.match(cacheFiles);
					})
					.catch(function (err) {
	            return cache.match('/offline/');
	        });
					// event.respondWith(fetch(request).
					// catch(function (err) {
	        //     return fetchCoreFile(request.url);
	        // }).catch(function (err) {
	        //     return fetchCoreFile('/offline/');
	        // }));


			}) // end caches.match(e.request)
	); // end e.respondWith

});



//

// 'use strict';
//
// var cacheCore = 'rm-v1-core',
//     cachePages = 'rm-v1-pages',
//     cacheImage = 'rm-v1-images';
//
// self.addEventListener('install', function (event) {
//     return event.waitUntil(caches.open(cacheCore).then(function (cache) {
//         return cache.addAll(['/offline/', 'static/css/style.css', './']);
//     }).then(self.skipWaiting()));
// });
//
// self.addEventListener('fetch', function (event) {
//     var request = event.request;
//     if (request.mode === 'navigate') {
//         event.respondWith(fetch(request).then(function (response) {
//             return cachePage(request, response);
//         }).catch(function (err) {
//             return getCachedPage(request);
//         }).catch(function (err) {
//             return fetchCoreFile('/offline/');
//         }));
//     } else {
//         event.respondWith(fetch(request).catch(function (err) {
//             return fetchCoreFile(request.url);
//         }).catch(function (err) {
//             return fetchCoreFile('/offline/');
//         }));
//     }
// });
//
// function fetchCoreFile(url) {
//     return caches.open(cacheCore).then(function (cache) {
//         return cache.match(url);
//     }).then(function (response) {
//         return response ? response : Promise.reject();
//     });
// }
//
// function fetchImageFile(url) {
//     return caches.open(cacheImage).then(function (cache) {
//         return cache.match(url);
//     }).then(function (response) {
//         return response ? response : Promise.reject();
//     });
// }
//
// function getCachedPage(request) {
//     return caches.open(cachePages).then(function (cache) {
//         return cache.match(request);
//     }).then(function (response) {
//         return response ? response : Promise.reject();
//     });
// }
//
// function cachePage(request, response) {
//     var clonedResponse = response.clone();
//     caches.open(cachePages).then(function (cache) {
//         return cache.put(request, clonedResponse);
//     });
//     return response;
// }
