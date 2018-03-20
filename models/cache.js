const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const key = require('../key/key');

mongoose.connect(key.key);

const GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

const CacheSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required']
	},
	rank: {
		type: String
	},
	available: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		required: [true, 'Title field is required']
	},
	whoSolveList: {
		type: [String]
	},
	geometry: GeoSchema
});

const Cache = mongoose.model('cache', CacheSchema);

module.exports = Cache;

/*
	{
		"name":"Hitaki",
		"rank":"big cache",
		"available":true,
		"title": "green fresh",
		"whoSolveList": [],
		"geometry":{"type":"point", "coordinates":[-79.789, 25.01]}
	}
*/
