process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Cache = require('../models/cache');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

/*
**		main block
*/
describe('Cache', () => {
	beforeEach( done => {
		Cache.remove({}, err => {
			done();
		});
	});

	/*
	**		Test the /GET route **search caches by author**
	*/
	describe('GET/api/caches/author', () => {
		it('should GET empty array', done => {
			chai.request(server)
			.get(`/api/caches/author?author=Wojciech Chodkowski`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});
		it('should GET all the caches ', (done) => {
		 	new Cache({
				name: "Wojtek",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}).save((err,cache) => {
				chai.request(server)
				.get('/api/caches/author?author=Wojtek')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);
					res.body[0].should.have.property('name').eql(cache.name);
					res.body[0].should.have.property('size').eql(cache.size);
					res.body[0].should.have.property('title').eql(cache.title);
					res.body[0].should.have.property('description').eql(cache.description);
					res.body[0].should.have.property('available').eql(cache.available);
					res.body[0].should.have.property('geometry');
					done();
				});
			});
		});
	});
	/*
	**		Test the /GET route- **search caches by title**
	*/
	describe('GET/api/caches/title', () => {
		it('should GET empty array', done => {
			chai.request(server)
			.get(`/api/caches/title?title?title=blue fresh`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});
		it('should GET all the caches ', (done) => {
		 	new Cache({
				name: "Wojtek",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}).save((err,cache) => {
				chai.request(server)
				.get('/api/caches/title?title=title')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);
					res.body[0].should.have.property('name').eql(cache.name);
					res.body[0].should.have.property('size').eql(cache.size);
					res.body[0].should.have.property('title').eql(cache.title);
					res.body[0].should.have.property('description').eql(cache.description);
					res.body[0].should.have.property('available').eql(cache.available);
					res.body[0].should.have.property('geometry');
					done();
				});
			});
		});

	});
	/*
	**		Test the /GET route- **search caches by id**
	*/
	describe('GET/api/caches/id',() => {
		it('should GET one cache by id', done => {
			chai.request(server)
			.get(`/api/caches/id?id=fasdfasd341312`)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('msg').eql("Bad ID");
				done();
			});
		});
		it('should GET all the caches ', (done) => {
		 	new Cache({
				name: "Wojtek",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}).save((err,cache) => {
				chai.request(server)
				.get(`/api/caches/id?id=${cache.id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(cache.name);
					res.body.should.have.property('size').eql(cache.size);
					res.body.should.have.property('title').eql(cache.title);
					res.body.should.have.property('description').eql(cache.description);
					res.body.should.have.property('available').eql(cache.available);
					res.body.should.have.property('geometry');
					done();
				});
			});
		});
	});

	/*
	**		Test the /GET route- **search caches by maxDistance
	*/
	describe('GET/api/caches/near', () => {
		it('should GET obiect with empty array', done => {
			chai.request(server)
			.get(`/api/caches/near?lng=50&lat=20`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});
		it('should GET all the caches ', (done) => {
		 	new Cache({
				name: "Wojtek",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}).save((err,cache) => {
				chai.request(server)
				.get(`/api/caches/near?lng=${cache.geometry.coordinates[0]}&lat=${cache.geometry.coordinates[1]}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);
					res.body[0].should.have.property('name').eql(cache.name);
					res.body[0].should.have.property('size').eql(cache.size);
					res.body[0].should.have.property('title').eql(cache.title);
					res.body[0].should.have.property('description').eql(cache.description);
					res.body[0].should.have.property('available').eql(cache.available);
					res.body[0].should.have.property('geometry');
					done();
				});
			});
		});
	});

	/*
	**		Test the /POST route- **create new cache**
	*/
	describe('POST/api/caches', () => {
		it('it should not post without name', done => {
			const cache = {
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}
			chai.request(server)
			.post('/api/caches')
			.send(cache)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('name');
				res.body.errors.name.should.have.property('kind').eql('required');
				done();
			});
		});
		it('should POST a cache', done => {

			const cache = {
				name: "author",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}
			chai.request(server)
			.post('/api/caches')
			.send(cache)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				res.body.should.have.property('size');
				res.body.should.have.property('title');
				res.body.should.have.property('description');
				res.body.should.have.property('available');
				res.body.should.have.property('geometry');
				done();
			});
		});
	});

	/*
	**		Test /PUT **update cache**
	*/
	describe('PUT/api/caches/:id', () => {
		it('should update a cache given the id', done => {
			new Cache({
				name: "author",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}).save((err, cache) => {
				chai.request(server)
				.put('/api/caches/'+cache.id)
				.send({size: 'extra large', available: false})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('size').eql('extra large');
					res.body.should.have.property('available').eql(false);
					done();
				});
			});
		});
	});
	/*
	**		Test /DELETE **delete cache**
	*/
	describe('DELETE/api/caches/:id', () => {
		it('should delete a cache given the id', done => {
			new Cache({
				name: "author",
				size: "small",
				title: "title",
				description: "description",
				available: true,
				geometry:{
					type: "point",
					coordinates: [-50, 20]
				}
			}).save((err, cache) => {
				chai.request(server)
				.delete('/api/caches/'+cache.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql('author');
					res.body.should.have.property('title').eql('title');
					done();
				});
			});
		});
	});


});
