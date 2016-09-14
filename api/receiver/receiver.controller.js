'use strict';
const Receiver = require('./receiver.model');
const process = require('./receiver.process');

exports.getAll = function(req, res) {
	Receiver.find({}, function (err, receivers) {
	    if(!!err) { return res({error: err}).code(500); }
	    console.log(receivers);
	    return res(receivers).code(200);
	  });
};

exports.getOne = function(req, res) {
	Receiver.findById(req.params.id, function (err, receiver) {
	    if(!!err) { return res({error: err}).code(500); }
	    return res(receiver).code(200);
	  });
};

exports.createOne = function(req, res) {
	Receiver.findOne({$or : [{code_on: req.payload.code_on}, {code_off: req.payload.code_off}]}, function (err, receiver) {
	    if(!!err) { return res({error: err}).code(500); }
	    if(!!receiver) { return res({error: "CODE_ALREADY_IN_USE"}).code(400); }
		receiver = new Receiver({
			name: req.payload.name,
			code_on: req.payload.code_on,
			code_off: req.payload.code_off,
			image_on: req.payload.image_on || undefined,
			image_off: req.payload.image_off || undefined,
	    	state: req.payload.state || false
	   	});
		receiver.save();
		return res(receiver).code(201);
	});
};

exports.deleteOne = function(req, res) {
  Receiver.findByIdAndRemove(req.params.id, function(err, receiver){
  	if(!!err) { return res({error: err}).code(500); }
  	if(!receiver) { return res().code(404); } 
  	return receiver().code(204);
  });
};

exports.emitOff = function(req, res) {
	Receiver.findById(req.params.id, function (err, receiver) {
	    if(!!err) { return res({error: err}).code(500); }
	    process.emit(receiver.code_off);
	    return res().code(204);
	  });
};

exports.emitOn = function(req, res) {
	Receiver.findById(req.params.id, function (err, receiver) {
	    if(!!err) { return res({error: err}).code(500); }
	    process.emit(receiver.code_on, function(err) {
	    	if(!!err) return res({error: "EMIT_ERROR"}).code(500);
	    	return res().code(204);
	    });
	});
};

exports.received = function(code) {
	Receiver.findOne({$or : [{code_on: code}, {code_off: code}]}, function (err, receiver) {
	    if(!!err) { console.error(err); }
	    if(!!receiver) {
	    	if(receiver.code_on === code) {
	    		receiver.state = true;
	    		receiver.save();
	    	}
	    	if(receiver.code_off === code) {
	    		receiver.state = false;
	    		receiver.save();
	    	}
	    }
	});
};