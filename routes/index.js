var express = require('express');
var router = express.Router();
let actionsModel = require('../models/actions');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-actions', async function(req,res){
  let getActions = await actionsModel.find();
  if(getActions.length > 0){
    res.json({result: true, getActions})
  }else{
    res.json({result:false});
  }
});

router.post('/save-action', async function(req,res){
  console.log('actionType',req.body.actionType);
  console.log('floor',req.body.floor);
  let newAction = new actionsModel({
    actionType: req.body.actionType,
    floor: req.body.floor
  });
  let savedAction = await newAction.save();
  if(savedAction){
    res.json({result:true,savedAction});
  }else{
    res.json({result:false});
  }
})

module.exports = router;
