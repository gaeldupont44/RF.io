'use strict';
const _ = require("lodash");
const Bridge = require('./bridge.model');

exports.getAll = function(req, res) {
	Bridge.find({}, function (err, bridges) {
	    if(!!err) { return res({error: err}).code(500); }
	    return res(bridges).code(200);
	  });
};

exports.getOne = function(req, res) {
	Bridge.findById(req.params.id, function (err, bridge) {
	    if(!!err) { return res({error: err}).code(500); }
	    return res(bridge).code(200);
	  });
};

exports.getEmitterByCodeReceiver = function(code, callback) {
	Bridge.find({code_receiver: code }, function (err, bridges) {
	    if(!!err) { return callback(err); }
	    var codes_emitter = [];
	    _(bridges).forEach(function(bridge) {
	    	codes_emitter.push(bridge.code_emitter);
	    });
	    return callback(codes_emitter);
	  });
};

exports.createOne = function(req, res) {
	if(req.payload.code_receiver === req.payload.code_emitter) {
		return res({error: "CODES_IDENTICAL"}).code(400);
	} else {
		var bridge = new Bridge({
			code_receiver: req.payload.code_receiver,
			code_emitter: req.payload.code_emitter
	   	});
		bridge.save();
		return res(bridge).code(201);
	}
};

exports.updateOne = function(req, res) {
	if(req.payload.code_receiver === req.payload.code_emitter) {
		return res({error: "CODES_IDENTICAL"}).code(400);
	} else {
		Bridge.findById(req.payload._id, function (err, bridge) {
	    if(!!err) { return res({error: err}).code(500); }
	    if(!bridge) { return res({error: "BRIDGE_NOT_FOUND"}).code(404); }
		if(!!req.payload.code_receiver) {
			bridge.code_receiver = req.payload.code_receiver;
		}
		if(!!req.payload.code_emitter) {
			bridge.code_emitter = req.payload.code_emitter;
		}
		bridge.save();
		return res().code(204);
	});
	}
	
};

exports.deleteOne = function(req, res) {
  Bridge.findById(req.params.id, function(err, bridge){
  	if(!!err) { return res({error: err}).code(500); }
  	if(!bridge) { return res({error: "BRIDGE_NOT_FOUND"}).code(404); }
  	bridge.remove(function(err) {
  		if(!!err) {
  			if(!!err) { return res({error: err}).code(500); }
  		}
  		return res().code(204);
  	});
  });
};