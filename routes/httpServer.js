const http = require('http');

module.exports = (app) => {
	const httpServer = http.createServer(app);
	httpServer.listen(8080);
	app.all('/*', (req, res, next) => {
		if(req.secure){
			return next();
		}
		res.redirect('https://localhost:8443'+req.url);
	});
}
