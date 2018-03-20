const express = require('express');
const router = express.Router();
const Cache = require('../models/cache');



router.post('/caches', (req, res, next) => {
	Cache.aggregate().near({
		near:{
			'type':'Point',
			'coordinates':[parseFloat(req.body.lng), parseFloat(req.body.lat)],
		},
		maxDistance: 100000,
		spherical: true,
		distanceField: 'dis'
	}).then((caches) => {
	//	console.log(caches);
		res.json(caches);
	}).catch(err => console.log(err));

	//wyciagniecie wszystkich danych
	// Cache.find({}).then((caches) => {
	// 	res.send(saches);
	// })
});

router.post('/caches', (req, res, next) => {
	Cache.create(req.body)
	.then(cache => {
		res.json(cache);
	}).catch(next)
});

router.put('/caches/:id', (req, res, next) => {
	Cache.findByIdAndUpdate({_id: req.params.id},req.body).then(() => {
		Ninja.findOne({_id: req.params.id}).then(cache => {
			res.send(cache);
		});
	});
});

router.delete('/caches/:id', (req, res, next) => {
	Cache.findByIdAndRemove({_id: req.params.id}).then((cache) => {
		res.send(cache);
	});
});

module.exports = router;
