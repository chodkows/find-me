const router = require('express').Router();

const authCheck = (req, res, next) => {

	if(!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
}

router.get('/', authCheck, (req, res) => {
	res.render('profile', { user: req.user	});
});

router.get('/new-cache', authCheck, (req, res) => {
	res.render('profile-newCache', {user: req.user});
});

router.get('/edit-cache', authCheck, (req, res) => {
	res.render('profile-editCache', {
		user: req.user,
		id: req.query.id
	});
});

router.get('/delete-cache', authCheck, (req, res) => {
	res.render('profile-deleteCache', {user: req.user});
});



module.exports = router;
