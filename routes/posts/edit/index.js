var reqResMod = require('mods/reqRes');
var express = require('express');
var router = express.Router();
var viewVars = {};
var container;
var reqRes;

router.get('/:name',function(req,res,next){
  reqRes = reqResMod.create(req,res,next,container);
  callView();
}); 

function init(aContainer){
  return router;
}

function callView(){
  viewVars.postName = reqRes.req.params.name
  reqRes.res.render('postEditor',viewVars); 
};

module.exports = init;
