const router = require('express').Router();

const userController = require('../../controllers/v1/userController.js');
router.post('/auth/register', userController.register);

const postController = require('../../controllers/v1/postController.js');
router.get('/posts', postController.index);
router.post('/posts', postController.store);

module.exports = router;