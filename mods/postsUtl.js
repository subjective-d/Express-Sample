var mongodb = require('mongodb');
var db = require('db');
var response; 
var updatePass;
var change;
var updateVals;
var updateNames;

function setVariables(){
  response = {}; 
  updatePass = { object: 'pages'};
  change = {};
  updateVals = {};
  updateNames = ['title','body','orderNumber'];
}

exports.readPosts = readPosts;
function readPosts(clause, callback){
  setVariables();
  updatePass.clause = clause;
  db.find(updatePass, response, function(){
    callback(response);
  });
}

exports.readPost = readPost;
function readPost(clause, callback){
  setVariables();
  updatePass.clause = clause;
  db.findOne(updatePass, response, function(){
    callback(response);
  });
}

exports.updatePost = updatePost;
function updatePost(vals, clause, callback){
  setVariables();
  for (var i = 0; i < updateNames.length; i++){
    if (vals[updateNames[i]])
      updateVals[updateNames[i]] = vals[updateNames[i]];
  }
  updatePass.change = { $set: updateVals };
  updatePass.clause = clause;

  db.update(updatePass, response, function(){
    callback(response);
  });
}

exports.upsertPost = upsertPost;
function upsertPost(name, order, callback){
  setVariables();
  updateVals = {}; 
  updateVals.name = name; 
  updateVals.orderNumber = order;
  updatePass.change = { $setOnInsert: updateVals };
  updatePass.clause = { 'name': name };
  updatePass.options = { upsert: true };

  db.update(updatePass, response, function(){
    callback(response);
  });
}

exports.delPost = delPost;
function delPost(id, callback){
  setVariables();
  updatePass.clause = { '_id': new mongodb.ObjectId(id) }; 
  db.remove(updatePass, response, function(){
    callback(response);
  }); 
} 

exports.delAllInterval = delAll;
function delAll(){
  setVariables();
  updatePass.clause = {}; 
  db.remove(updatePass, response, function(){
    setTimeout(function(){
      delAll(); 
    },300000);
  }); 
} 
