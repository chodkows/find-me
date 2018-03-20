const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const httpServer = require('./routes/httpServer');

const privateKey = fs.readFileSync('./key/key.pem', 'utf8');
const certificate = fs.readFileSync('./key/cert.pem', 'utf8');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
httpServer(app);
const httpsServer = https.createServer({
	key: privateKey,
	cert: certificate
}, app);

app.use('/api', routes);
app.use((err, req, res, next) => {
	//console.log(err);
	res.status(422).send({error: err.message});
});

httpsServer.listen(process.env.port || 8443,() => {
	console.log('Server listen at 8443');
});
