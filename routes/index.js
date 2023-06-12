var express = require('express');
var router = express.Router();
const AuthService = require('../services/AuthService');

router.post('/login', AuthService.login);
router.post('/signup', AuthService.signup);

module.exports = router;
