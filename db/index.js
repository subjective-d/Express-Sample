var MongoClient =  require('mongodb').MongoClient; 
var config = require('../config');
var assert = require('assert');
var object;
var clause;
var change;
var options;
var set;

//shared functions
function setVars(pass, callback){
  //table
  object = pass.object;
  //where values
  clause = pass.clause;
  //update values
  change = pass.change;
  //insert values
  set = pass.set;
  //option values
  options = pass.options;
  callback();
}

function connect(callback) {
  MongoClient.connect(config.mongoConnectionUrl + config.pageDatabase, {}, callback);
}

function onError(err,resp,callback){
  resp.error = err;
  callback();
}
//end shared functions

//insert
exports.create = create;
function create(pass, resp, callback){
  setVars(pass, function(){
    createConnect(resp,callback);
  }); 
}

function createConnect(resp, callback){ 
  connect(function(err, db){
    onCreate(err,db,resp,callback);
  }); 
}

function onCreate(err, db, resp, callback){
  if(err) onError(err,resp,callback);
  var collection = db.collection(object);
  collection.insertOne(set, function(err, result){
    db.close();
    callback();
  });
}
//end insert 
  

//update
exports.update = update;
function update(pass, resp, callback){
  setVars(pass,function(){
    updateConnect(resp, callback); 
  });
}

function updateConnect(resp, callback){
  connect(function(err, db){
    onUpdate(err, db, resp, callback);
  }); 
}

function onUpdate(err, db, resp, callback){
  if(err) onError(err,resp,callback);
  var collection = db.collection(object);
  collection.updateOne( clause, change, options,
    function(err, result){
      db.close();
      callback();
    }
  );
}
//end update

//start delete
exports.remove = remove; 
function remove(pass, resp, callback){
  setVars(pass,function(){
    removeConnect(resp, callback);
  });
}

function removeConnect(resp, callback){
  connect(function(err, db){
    onRemove(err, db, resp, callback);
  }); 
}

function onRemove(err, db, resp, callback){
  if(err) onError(err,resp,callback);
  var collection = db.collection(object);
  collection.remove(clause, function(err, result){
    db.close();
    callback();
  });
}
//end delete

//get collection
exports.find = find;

function find(pass,resp,callback){
  setVars(pass,function(){
    findConnect(resp,callback);
  });
}

function findConnect(resp,callback){
  connect(function(err, db){
    onFind(err, db, resp, callback);
  }); 
}

function onFind(err, db, resp, callback){
  if(err) onError(err,resp,callback);
  var collection = db.collection(object);
  collection.find(clause).toArray(function(err, result){
    resp.results = result || [];
    db.close();
    callback();
  }); 
}
//end get collection


//get single
exports.findOne = findOne;

function findOne(pass,resp,callback){
  setVars(pass,function(){
    findOneConnect(resp,callback);
  });
}

function findOneConnect(resp, callback){
  connect(function(err, db){
    onFindOne(err, db, resp, callback);
  }); 
}

function onFindOne(err, db, resp, callback){
  if(err) onError(err,resp,callback);
  var collection = db.collection(object);
  collection.findOne(clause,function(err, result){
    resp.results = result || {};
    db.close();
    callback();
  }); 
}
//end get single 
