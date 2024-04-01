const router = require('express').Router();

const v1 = require('../../controllers/v1');
router.post('/users', v1.user.store);
router.get('/users', v1.user.index);
router.get('/users/:id', v1.user.show);
router.post('/users/:id/follow', v1.user.follow);


module.exports = router;