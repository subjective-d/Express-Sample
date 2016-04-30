var db = require('mods/postsUtl');
var returnData = {};
var reqRes;

function init(aReqRes){
  reqRes = aReqRes;
  db.updatePost(reqRes.req.body, { 'name': reqRes.req.params.name }, callView); 
}

function callView(response){
  reqRes.res.setHeader('Content-Type', 'application/json');
  returnData.error = response.error;
  reqRes.res.json(response.results); 
}

module.exports = init;
