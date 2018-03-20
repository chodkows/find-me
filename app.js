const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const httpMiddleware = require('./middlewares/httpMiddleware');
const routes = require('./routes/routes');

const privateKey = fs.readFileSync('./key/key.pem', 'utf8');
const certificate = fs.readFileSync('./key/cert.pem', 'utf8');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());

httpMiddleware(app);
routes(app);

const httpsServer = https.createServer({
	key: privateKey,
	cert: certificate
}, app);

httpsServer.listen(8442,() => {
	console.log('Server listen at 8442');
});
