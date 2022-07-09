var express = require('express');
var router = express.Router();
let userModel = require('../models/users');
let uid2 = require('uid2');
let bcryptjs = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-admin', async function(req,res){
  let hashPassword = bcryptjs.hashSync(req.body.password, 10);
  let newAdmin = new userModel({
    login: req.body.login,
    password: hashPassword,
    token: uid2(32)
  });
  let savedAdmin = await newAdmin.save();
  if(savedAdmin){
    res.json({result:true,savedAdmin});
  }else{
    res.json({result:false});
  }
});

router.post('/login', async function(req,res){
  let findAdmin = await userModel.findOne({login: req.body.login});
  if(findAdmin){
    let password = req.body.password;
    if(bcryptjs.compareSync(password, findAdmin.password)){
      res.json({result: true, token: findAdmin.token});
    }else{
      res.json({result:false});
    }
  }else{
    res.json({result:false});
  }
})

module.exports = router;
