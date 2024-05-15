const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { JWT_SECRET } = process.env;
const auth = require('../controllers/auth.controllers');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    jwt.verify(token, JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: err.message,
                data: null
            });
        }

        let user = await prisma.user.findFirst({
            where: { id: data.id }
        });
        delete user.password;
        req.user = user;
        next();
    });
};

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/whoami', restrict, auth.whoami);

router.get('/verify', auth.verifyEmail);
router.get('/request-verify', restrict, auth.requestVerifyEmail);

module.exports = router;
