var container = {};
var express = require('express');
var router = express.Router();
var reqRes = require('mods/reqRes');

router.post('/', function(req,res,next){ 
  require('./post')(reqRes.create(req,res,next,container));
});

router.get('/', function(req,res,next){ 
  require('./get')(reqRes.create(req,res,next,container));
});

router.put('/:name', function(req,res,next){ 
  require('./put')(reqRes.create(req,res,next,container));
});

router.delete('/:name', function(req,res,next){ 
  require('./delete')(reqRes.create(req,res,next,container));
}); 

function init(aContainer){
  container = aContainer; 
  return router;
}

module.exports = init;
