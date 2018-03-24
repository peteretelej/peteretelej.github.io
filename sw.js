var cacheName="peterghp-v5"

self.addEventListener("install",function(event){
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			cache.addAll([
				"/",
				"/style.css",
				"/favicon.ico",
				"/manifest.json",
				"/assets/js/main.js",
				"/images/pic.png",
				"/assets/js/axios.min.js",
				"/assets/js/vue.min.js",
			])
		})
	)
})

self.addEventListener("activate",function(event){
	event.waitUntil(
		caches.keys().then(function(keys){
			keys.forEach(function(key){
				if (!key.startsWith("peterghp")){
					return
				}
				if (key !== cacheName){
					caches.delete(key)
				}
			})
		})
	)
})

var pic = "/images/pic.png"

self.addEventListener("fetch",function(event){
	var requrl = new URL(event.request.url)
	if(requrl.origin !== self.location.origin){
		if(requrl.pathname.indexOf("/u/2271973")!==0){
			event.respondWith(fetch(event.request))
			return
		}
		// github avatar image response
		event.respondWith(
			caches.open(cacheName).then(function(cache){
				return cache.match(pic).then(function(response){
					return fetch(event.request).then(function(fresponse){
						if(fresponse){
							cache.put(pic,fresponse.clone())
						}
						return fresponse
					}).catch(function(){
						return response ||fetch(event.request);
					})
				})
			})
		)
		return
	}

	event.respondWith(
		caches.open(cacheName).then(function(cache){
			return cache.match(event.request).then(function(response){
				return fetch(event.request).then(function(fresponse){
					cache.put(event.request,fresponse.clone())
					return fresponse
				}).catch(function(){
					return response ||fetch(event.request);
				})
			})
		})
	)
})
