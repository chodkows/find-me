const Cache = require('../models/cache-model');

const routes = (app) => {

	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/add', (req, res) => {
		res.render('form');
	});

	app.get('/edit', (req, res) => {
		res.render('list');
	});
	
	app.get('/remove',(req, res) => {
		res.render('list');
	});

	app.get('/login',(req, res) => {
		res.render('login');
	});





}

module.exports = routes;
