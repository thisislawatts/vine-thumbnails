var http = require('http'),
	jsdom = require('jsdom'),
	url = require('url'),
	request = require('request');


http.createServer(function(req, res) {
	var urlParams = url.parse(req.url);

	if ( urlParams.path === "/" ) {
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end("You should be supplying us vine path ie. v/hIMKrdipxBE");
	}

	jsdom.env({
		url : "https://vine.co/v/" + urlParams.path.split('/').pop(),
		features: {
			QuerySelector: true
		},
		done: function(errors, window) {
			var metaElement = window.document.querySelector('meta[property="og:image"]');
			if (metaElement){
				//  metaElement.content 
				request( metaElement.content ).pipe( res );
			} else {
				res.writeHead(200, {'Content-Type': 'text/plain' });
				res.end("We couldn't find meta element to use for image, so instead I provide you with this text.");
			}
		}
	});

}).listen( process.env.PORT || 1337 );