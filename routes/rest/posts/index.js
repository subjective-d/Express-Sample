var container = {};
var express = require('express');
var router = express.Router();
var reqRes = require('mods/reqRes');

router.get('/', function(req,res,next){ 
  require('./get')(reqRes.create(req,res,next,container));
});

function init(aContainer){
  container = aContainer; 
  return router;
}

module.exports = init;
