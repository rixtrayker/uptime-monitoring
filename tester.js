var express = require('express');
var router = express.Router();
const knex = require('./utils/db');
const AuthService = require('./services/AuthService');

const TestResolvers  = {
  async resolve(req,res,next){
    const token = AuthService.login('amr@admin.com','1234');

    // .catch((error) => {
    //   console.log('errrrrrror');
    //   res.status(500).json({error});
    // });

    res.status(200).json({token});
  }
}

router.get('/', TestResolvers.resolve);

module.exports = router;
