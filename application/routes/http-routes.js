const http = require('http');


const httpServer = (app) => {
	http.createServer(app);
	app.listen(8080);

	app.all('/*', (req, res, next) => {
		if(req.secure) {
			next();
		} else {
			res.redirect('https://localhost:8443'+req.url);
		}
	});
}
module.exports = httpServer;
