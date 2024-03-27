const router = require('express').Router();

const userController = require('../../controllers/v1/userController.js');

router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.post('/users', userController.store);

module.exports = router;