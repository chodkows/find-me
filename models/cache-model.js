const mongoose = require('mongoose');

const key = require('../key/dbkey');
const Schema = mongoose.Schema;
mongoose.connect(key.key);


const geoSchema = new Schema({
	type: {
		type: String,
		default: "Poing"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});
const cacheSchema = new Schema({
	geometry: geoSchema,
	title: String,
	description: String,
	author: String,
	listOfFinders: [String],
});

const Cache = mongoose.model('geocache', cacheSchema);

module.exports = Cache;
