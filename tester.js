var express = require('express');
var router = express.Router();
const knex = require('./utils/db');
// const UserRepository = require('./repositories/UserRepository');
const TestResolvers  = {
  async resolve(req,res,next){
    // var id = 2;
    const [email] = await knex('users').insert({email:'ews32',name:"amasr",password:"1234"})
    .catch((error) => {
      console.log('errrrrrror');
      res.status(500).json({error});
    });

    res.status(200).json({email});
  }
}

router.get('/', TestResolvers.resolve);

module.exports = router;
