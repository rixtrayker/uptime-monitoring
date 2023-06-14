var express = require('express');
var router = express.Router();
const {login, register, verifyEmail} = require('../controllers/AuthController');

router.post('/login', login);
router.post('/register', register);
router.post('/verify', verifyEmail);

module.exports = router;
