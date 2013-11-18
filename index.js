var http = require('http'),
	jsdom = require('jsdom'),
	url = require('url'),
	request = require('request');


http.createServer(function(req, res) {
	var urlParams = url.parse(req.url);

	jsdom.env({
		url : "https://vine.co/v/" + urlParams.query,
		features: {
			QuerySelector: true
		},
		done: function(errors, window) {
			var metaElement = window.document.querySelector('meta[property="og:image"]');
			if (metaElement){
				//  metaElement.content 
				request( metaElement.content ).pipe( res );
			} else {

			}
		}
	});

	
	
}).listen(1337, '127.0.0.1');