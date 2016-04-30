var reqResMod = require('mods/reqRes');
var express = require('express');
var router = express.Router();
var container;
var reqRes;

router.get('/', function(req,res,next){
  reqRes = reqResMod.create(req,res,next,container);
  reqRes.res.render('home'); 
}); 

function init(aContainer){
  container = aContainer;
  return router;
}

module.exports = init;
