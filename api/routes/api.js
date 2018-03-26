const express = require('express');
const router = express.Router();
const Cache = require('../models/cache');
const {check, validationResult} = require('express-validator/check');

exports.validate = [
	check('name').trim().isLength({ min:1 }).withMessage('Name is required')
];
exports.checkValidation = (req,res, next) => {
	const errors = validationResult(req);

	if( !errors.isEmpty()) {
		return res.render('home', {
			validated: req.body,
			errors: errors.mapped(),
			showLightbox: 'true',
		});
	}
	next();
}

router.post('/caches/user', (req, res, next) => {
	Cache.find({name: req.body.name}).then( data => {
		res.json(data);
		console.log(data);
	}).catch(err => console.log(err))
});
/*
**		sharing data by author
*/
router.get('/caches/author', (req, res, next) => {
	console.log(req.query.author);
	Cache.find({name: req.query.author}).then( data => {
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
		maxDistance: 25000,/*parseFloat(req.query.dist)*1000*/
		spherical: true,
		distanceField: 'dis'
	}).then(caches => {
		res.json(caches);

	}).catch(err => console.log(err));
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
