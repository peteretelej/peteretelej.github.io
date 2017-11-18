var cacheName="peterghp-v2"

self.addEventListener("install",function(event){
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			cache.addAll([
				"/sw.js",
				"/",
				"/style.css",
				"/images/pic.png"
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
		if(requrl.pathname.indexOf("/u/2271973")===0){
			event.respondWith(
				caches.open(cacheName).then(function(cache){
					return cache.match(pic).then(function(response){
						return fetch(event.request).then(function(fresponse){
							if(fresponse){
								cache.put(pic,fresponse.clone())
							}
							return fresponse
						}).catch(function(){
							return response
						})
					})
				})
			)
			return
		}
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
