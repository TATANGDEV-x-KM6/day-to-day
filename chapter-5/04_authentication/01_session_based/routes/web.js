var express = require('express');
var router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
