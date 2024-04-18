const express = require('express');
const router = express.Router();
const { restrict } = require('../middlewares/auth.middlewares');

router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/whoami', restrict, (req, res) => {
    res.render('whoami', { 'user': req.user });
});

module.exports = router;
