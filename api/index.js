const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
/*
**	For https protocol
**
**	const privateKey = fs.readFileSync('./config/key.pem', 'utf8');
** const certificate = fs.readFileSync('./config/cert.pem', 'utf8');
*/


const app = express();

/*
**		For https protocol
**
**		const httpsServer = https.createServer({
**		key: privateKey,
**		cert: certificate
** 	}, app);
**		httpsServer.listen(process.env.port || 3333,() => {
**	 	console.log('Api server listen at 3333');
**		 });
*/


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', routes);
app.use((err, req, res, next) => {
	res.status(422).send({error: err.message});
});
app.listen(3333);


module.exports = app; //for testing
