const express = require('express');
const router = express.Router();
const { register, login, whoami } = require('../controllers/auth.controllers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

let restrict = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization || !authorization.split(' ')[1]) {
        return res.status(401).json({
            status: false,
            message: 'token not provided!',
            data: null
        });
    }

    let token = authorization.split(' ')[1];
    let user = jwt.verify(token, JWT_SECRET);
    delete user.iat;
    req.user = user;

    next();
};

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', restrict, whoami);

module.exports = router;
