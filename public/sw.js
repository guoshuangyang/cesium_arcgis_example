self.addEventListener("fetch", function (event) {
  if (event.request.url.indexOf("tianditu.gov.cn") > -1) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response
        }
        return fetch(event.request).then(function (response) {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }
          var responseToCache = response.clone()
          caches.open("tianditu").then(function (cache) {
            cache.put(event.request, responseToCache)
          })
          return response
        })
      })
    )
  }
})
