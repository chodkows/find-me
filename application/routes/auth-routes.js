const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
	// res.render('login', {user: req.user});
	res.render('login', {user: req.user});
});

router.get('/logout', (req, res) => {
	req.logout();
	// res.render('home', { user: req.user });
	res.render('home', {user: req.user});
});

router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.render('profile', {user: req.user});
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
	res.render('profile', {user: req.user});
});

module.exports = router;
