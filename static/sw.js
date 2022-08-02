importScripts('./uv/uv.sw.js');

const sw = new UVServiceWorker();
/*
sw.on('request', event => {
    const { data: request } = event;
    if (request.url.hostname.endsWith('netflix.com')) {
	event.respondWith(
	  new Response('This web page is forbidden for security reasons.', {
	  	status: 400
	  })
	);
    };
});
*/
self.addEventListener('fetch', event =>
    event.respondWith(
        sw.fetch(event)
    )
);