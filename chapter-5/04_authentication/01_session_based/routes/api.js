var express = require('express');
var router = express.Router();
const passport = require('../libs/passport');

let { register, } = require('../controllers/auth.controllers');
router.post('/register', register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/whoami',
    failureRedirect: '/login'
}));

module.exports = router;
