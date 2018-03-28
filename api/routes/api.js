const express = require('express');
const Regex = require('regex');
const router = express.Router();
const Cache = require('../models/cache');
//nie wiem po co to, sprawdzic czy potrzebna ta sciezka
router.post('/caches/user', (req, res, next) => {
	Cache.find({name: req.body.name}).then( data => {
		res.json(data);
	}).catch(err => console.log(err))
});
/*
**		sharing data by author
*/
router.get('/caches/author', (req, res, next) => {
	Cache.find({name: req.query.author}).then( data => {
		res.json(data);
	}).catch(err => console.log(err))
});
/*
**		find by id
*/
router.get('/caches/id', (req, res, next) => {
	Cache.findById({_id: req.query.id}).then( data => {
		res.json(data);
	}).catch(err => console.log(err))
});
/*
**		sharing data by author
*/
router.get('/caches/title', (req, res, next) => {
	Cache.find({title: req.query.title}).then( data => {
		res.json(data);
	}).catch(err => console.log(err))
});

router.get('/caches/near', (req, res, next) => {
	Cache.aggregate().near({
		near:{
			'type':'Point',
			'coordinates':[parseFloat(req.query.lng), parseFloat(req.query.lat)],
		},
		maxDistance: 100000,/*parseFloat(req.query.dist)*1000*/
		spherical: true,
		distanceField: 'dis'
	}).then(caches => {
		res.json(caches);

	}).catch(err => console.log(err));
});



router.post('/caches', (req, res, next) => {
	// if(validate(req.body)){
		Cache.create(req.body)
			.then(cache => {
				res.json(cache);
			}).catch(err => res.send(err));
	// } else {
	// 	console.log('Validation error');
	// }

});

router.put('/caches/:id', (req, res, next) => {
	// if(validate(req.body)) {
		Cache.findByIdAndUpdate({_id: req.params.id},req.body).then(() => {
			Cache.findOne({_id: req.params.id}).then(cache => {
				console.log(cache);
				res.send(cache);
			}).catch(err => console.log(err));
		});
	// } else {
	// 	console.log('Validation error');
	// }

});

router.delete('/caches/:id', (req, res, next) => {
	Cache.findByIdAndRemove({_id: req.params.id}).then((cache) => {
		res.send(cache);
	});
});

/*
**		Validation
*/
// const patterns = {
// 	longitude: /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/,
// 	latitude: /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/,
// 	title: /[a-zA-Z0-9\s]{5,40}/,
// 	description: /[a-zA-Z0-9\s\.,'";:]{5,40}/,
// 	name: /[a-zA-Z0-9\s]{5,40}/,
// 	size: /^(extra small)|(small)|(medium)|(large)|(extra large)$/,
// 	available: /(true)|(false)/,
// }
//
// function validate(body) {
// 	let result = false;
//
// 	body.name === undefined ? result = true : result = patterns.name.test(body.name);
// 	body.size === undefined ? result = true : result = patterns.size.test(body.size);
// 	body.title === undefined ? result = true : result = patterns.title.test(body.title);
// 	body.description === undefined ? result = true : result = patterns.description.test(body.description);
// 	body.available === undefined ? result = true : result = patterns.available.test(body.available);
// 	body.geometry === undefined ? result = true : result = patterns.longitude.test(body.geometry.coordinates[1]);
// 	body.geometry === undefined ? result = true : result = patterns.latitude.test(body.geometry.coordinates[0]);
//
// 	// result = patterns.name.test(body.name);
// 	// result = patterns.size.test(body.size);
// 	// result = patterns.title.test(body.title);
// 	// result = patterns.description.test(body.description);
// 	// result = patterns.available.test(body.available);
// 	// result = patterns.longitude.test(body.geometry.coordinates[1]);
// 	// result = patterns.latitude.test(body.geometry.coordinates[0]);
// 	return result;
// }



module.exports = router;
