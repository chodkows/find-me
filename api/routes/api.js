const express = require('express');
const Regex = require('regex');
const router = express.Router();
const Cache = require('../models/cache');

/*		ok
**		search caches by author
*/
router.get('/caches/author', (req, res, next) => {

		Cache.find({name: req.query.author})
		.then( data => {
			res.json(data);
		})
		.catch(err => console.log(err))
});

/*		ok
**		search caches by id
*/
router.get('/caches/id', (req, res, next) => {

		Cache.findById({_id: req.query.id})
		.then( data => {
			res.json(data);
		})
		.catch(err => {
			res.send({msg: 'Bad ID'});
		});
});

/*		ok
**		search caches by title
*/
router.get('/caches/title', (req, res, next) => {

		Cache.find({title: req.query.title})
		.then( data => {
			res.json(data);
		})
		.catch(err => console.log(err))
});

/*
**		search caches by coordinates
*/
router.get('/caches/near', (req, res, next) => {

		Cache.aggregate()
		.near({
			near:{
				'type':'Point',
				'coordinates':[parseFloat(req.query.lng), parseFloat(req.query.lat)],
			},
			maxDistance: 100000,/*parseFloat(req.query.dist)*1000*/
			spherical: true,
			distanceField: 'dis'
		})
		.then(caches => {
			res.json(caches);

		})
		.catch(err =>  {
			res.send({ msg: 'Bad cooridates. Found nothing.'});
		});

});

/*		ok
**		create new cache
*/
router.post('/caches', (req, res, next) => {

		Cache.create(req.body)
		.then(cache => {
			res.json(cache);
		})
		.catch(err => res.send(err));
});

/*		ok
**		update cache
*/
router.put('/caches/:id', (req, res, next) => {

		Cache.findByIdAndUpdate({_id: req.params.id},req.body)
		.then(() => {
			Cache.findOne({_id: req.params.id})
			.then(cache => {
				res.send(cache);
			})
			.catch(err => console.log(err));
		});
});

/*		ok
**		delete cache
*/
router.delete('/caches/:id', (req, res, next) => {

		Cache.findByIdAndRemove({_id: req.params.id})
		.then((cache) => {
			res.send(cache);
		})
		.catch(err => console.log(err));
});

/*
**		json
*						{
*							"name": "author",
*							"size": "small",
*							"title": "title",
*							"description": "description",
*							"available": true,
*							"geometry":{
*								"type": "point",
*								"coordinates": [-50, 20]
*							}
*						}
*/

module.exports = router;
