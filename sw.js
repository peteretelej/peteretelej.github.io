var cacheName="peterghp-v1"

self.addEventListener("install",function(event){
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			cache.addAll([
				"/sw.js",
				"/",
				"/style.css"
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

self.addEventListener("fetch",function(event){
	var requrl = new URL(event.request.url)
	if(requrl.origin !== self.location.origin){
		event.respondWith(fetch(event.request))
		return
	}
	event.respondWith(
		caches.open(cacheName).then(function(cache){
			return cache.match(event.request).then(function(response){
				return fetch(event.request).then(function(fresponse){
					cache.put(event.request,fresponse.clone())
					return fresponse
				}).catch(function(){
					return response
				})
			})
		})
	)
})
