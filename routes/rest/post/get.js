var db = require('mods/postsUtl');
var returnData = {};
var reqRes;

function init(aReqRes){
  reqRes = aReqRes;
  db.readPost({'name': reqRes.req.query.name}, callView);
}

function callView(response){
  reqRes.res.setHeader('Content-Type', 'application/json');
  returnData.post = response.results;
  returnData.error = response.error;
  reqRes.res.json(returnData); 
}

module.exports = init;
