var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/verify', function(req, res, next) {
  UserController.verify(req,res);
  res.send();
});

module.exports = router;
