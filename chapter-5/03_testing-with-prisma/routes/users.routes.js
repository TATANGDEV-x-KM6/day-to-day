var express = require('express');
var router = express.Router();

const users = require('../controllers/users');
router.post('/', users.create);

module.exports = router;
