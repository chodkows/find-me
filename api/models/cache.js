const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const key = require('../config/keyTest');

mongoose.connect(key.key);

const GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere",
		validate: {
			isAsync: true,
			validator: (v, cb) => {
				const latRegex = /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/;
				const lngRegex = /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/;
				const msg = v + ' is not a valid coordinates';
				const latValue = latRegex.test(v[0]);
				const lngValue = lngRegex.test(v[1]);
				if(latValue && lngValue) {
					cb(true, msg);
				} else {
					cb(false, msg);
				}
			}
		}
	}
});

const patterns = {
	longitude: /^(-?1?([0-9]?\d)(\.\d{1,10})?|(-?180))$/,
	latitude: /^((-?([1-8]?\d)(\.\d{1,10})?)|(-?90?))$/,
	title: /[a-zA-Z0-9\s]{5,40}/,
	description: /[a-zA-Z0-9\s\.,'";:]{5,40}/,
	name: /[a-zA-Z0-9\s]{5,40}/,
	size: /^(extra small)|(small)|(medium)|(large)|(extra large)$/,
	available: /(true)|(false)/,
}

const CacheSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required'],
		validate: {
			isAsync: true,
			validator: (v, cb) => {
				const regex = /[a-zA-Z0-9\s]{5,40}/;
				const msg = v +' is not a valid name';
				cb(regex.test(v), msg);
			}
		}
	},
	size: {
		type: String,
		required: [true, 'Size is required'],
		validate: {
			isAsync: true,
			validator: (v, cb)=> {
				const regex = /^(extra small)|(small)|(medium)|(large)|(extra large)$/;
				const msg = v + ' is not a valid size';
				cb(regex.test(v), msg);
			}
		}
	},
	available: {
		type: Boolean,
		default: true,
		validate: {
			isAsync: true,
			validator: (v, cb) => {
				const regex = /(true)|(false)/;
				const msg = v + ' is not a valid available type';
				cb(regex.test(v), msg);
			}
		}
	},
	title: {
		type: String,
		required: [true, 'Title field is required'],
		validate: {
			isAsync: true,
			validator: (v, cb) => {
				const regex = /[a-zA-Z0-9\s]{5,40}/;
				const msg = v + " is not a valid title";
				cb(regex.test(v), msg);
			}
		}
	},
	description: {
		type: String,
	},
	whoSolveList: {
		type: [String]
	},
	geometry: GeoSchema,

});

const Cache = mongoose.model('cache', CacheSchema);

module.exports = Cache;

/*
	{
		"name":"Hitaki",
		"size":"big cache",
		"available":true,
		"title": "green fresh",
		"whoSolveList": [],
		"geometry":{"type":"point", "coordinates":[-79.789, 25.01]}
	}
*/
