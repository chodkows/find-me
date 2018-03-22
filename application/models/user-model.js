const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const keys = require('../config/keys');

mongoose.connect(keys.mongodb.mongoURL);

const userSchema = new Schema({
	username: String,
	googleId: String,
	facebookId: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
