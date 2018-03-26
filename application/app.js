//imports
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const httpRoutes = require('./routes/http-routes');
const profileRoutes = require('./routes/profile-routes');
const authRoutes = require('./routes/auth-routes');
const passportGoogleSetup = require('./config/passport-google-setup');
const passportFacebookSetup = require('./config/passport-facebook-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
// const cors = require('cors');

//keys
const privateKey = fs.readFileSync('./config/key.pem', 'utf8');
const certificate = fs.readFileSync('./config/cert.pem', 'utf8');

//server config
const app = express();
httpRoutes(app);
const httpsServer = https.createServer({
	key : privateKey,
	cert: certificate
}, app);
httpsServer.listen(8443, () => {
	console.log('Application server listen at port 8443');
});

//view engine
app.set('view engine', 'ejs');

//middlewares
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));

// app.use(cors());
app.use(express.static('./public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//routes
app.get('/', (req, res) => {
	res.render('home', {user: req.user});
});
// app.get('/', (req, res) => {
// 	res.json(req.user);
// });
