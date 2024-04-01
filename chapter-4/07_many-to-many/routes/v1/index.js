const router = require('express').Router();

const v1 = require('../../controllers/v1');
router.post('/auth/register', v1.user.register);


router.get('/users/:id', v1.user.register);
router.post('/users/:id/follow', v1.follow.follow);


module.exports = router;