var db = require('mods/postsUtl');
var returnData = {};
var reqRes;

function init(aReqRes){ 
  reqRes = aReqRes;
  var time = Date.now();
  var name = reqRes.req.body.name ? reqRes.req.body.name : time.toString(); 
  db.upsertPost(name, time, callView); 
}

function callView(response){
  reqRes.res.setHeader('Content-Type', 'application/json');
  returnData.error = response.error;
  reqRes.res.json(returnData); 
}

module.exports = init;
