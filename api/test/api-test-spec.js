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
	**		Test the /GET route
	*/
	describe('/GET caches', () => {
		it('should GET all the caches of author', (done) => {
			chai.request(server)
			.get(`/api/caches/author?author=Wojciech Chodkowski`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});
	});
	/*
	**		Test the /POST route
	*/
	describe('/POST new caches', () => {
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
});
