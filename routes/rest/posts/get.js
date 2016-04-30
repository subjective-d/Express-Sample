var db = require('mods/postsUtl');
var returnData = {};
var reqRes;

//function init(aReq,aRes,next,aContainer){
function init(aReqRes){
  reqRes=aReqRes;
  db.readPosts({},callView);
}

function callView(response){
  reqRes.res.setHeader('Content-Type', 'application/json');
  returnData.posts = response.results;
  returnData.error = response.error;
  reqRes.res.json(returnData); 
}

module.exports = init;
