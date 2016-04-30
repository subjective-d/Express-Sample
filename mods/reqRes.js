var reqRes = {}; 

exports.create = create;
function create(req,res,next,container){
  reqRes.req = req; 
  reqRes.res = res;
  reqRes.next = next;
  reqRes.container = container;
  return reqRes;
}
