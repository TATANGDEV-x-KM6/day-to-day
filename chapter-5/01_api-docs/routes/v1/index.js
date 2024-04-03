const router = require('express').Router();

// auth middleware
function auth(req, res, next) {
    let { authorization } = req.headers;

    if (authorization){
        let token = authorization.split(' ')[1];

        if (token) {
            return next();
        }
    }

    return res.status(401).json({
        status: false,
        message: 'you\'re not authorized!',
        data: null
    });
}

const v1 = require('../../controllers/v1');
router.post('/users', auth, v1.user.store);
router.get('/users', v1.user.index);
router.get('/users/:id', v1.user.show);
router.post('/users/:id/follow', v1.user.follow);


module.exports = router;