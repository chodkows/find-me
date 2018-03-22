const router = require('express').Router();

const authCheck = (req, res, next) => {

	if(!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
}

router.get('/', authCheck, (req, res) => {
	res.render('profile', {user: req.user});
});

router.get('/new-cache', authCheck, (req, res) => {
	res.render('profile-newCache', {user: req.user});
});

module.exports = router;
