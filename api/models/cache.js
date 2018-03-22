const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const key = require('../config/key');

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
	size: {
		type: String,
	},
	available: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		required: [true, 'Title field is required']
	},
	description: {
		type: String,
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
