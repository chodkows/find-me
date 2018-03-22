const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then( user => {
		done(null, user);
	});
});

passport.use(
	new FacebookStrategy({
		clientID: keys.facebook.clientID,
		clientSecret: keys.facebook.clientSecret,
		callbackURL: 'https://localhost:8443/auth/facebook/redirect'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ facebookId: profile.id }).then( currentUser => {
			if(currentUser) {
				done(null, currentUser);
			} else {
				new User({
					facebookId : profile.id,
					username: profile.displayName,
				}).save().then( newUser => {
					done(null, newUser);
				});
			}
		});
	})
)
