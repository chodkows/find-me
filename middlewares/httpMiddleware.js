const http = require('http');
module.exports = (app) => {
	const httpServer = http.createServer(app);

	app.all('/*', (req, res, next) => {
		if(req.secure) {
			return next();
		}
		res.redirect('https://localhost:8442'+ req.url);
	});
	httpServer.listen(8081);
}
