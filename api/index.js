const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('./config/key.pem', 'utf8');
const certificate = fs.readFileSync('./config/cert.pem', 'utf8');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

const httpsServer = https.createServer({
	key: privateKey,
	cert: certificate
}, app);

app.use('/api', routes);
app.use((err, req, res, next) => {
	res.status(422).send({error: err.message});
});

httpsServer.listen(process.env.port || 8443,() => {
	console.log('Server listen at 8443');
});
