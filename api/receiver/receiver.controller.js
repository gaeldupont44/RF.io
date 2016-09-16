'use strict';
const Receiver = require('./receiver.model');
const process = require('./receiver.process');

exports.getAll = function(req, res) {
	Receiver.find({}, function (err, receivers) {
	    if(!!err) { return res({error: err}).code(500); }
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
	if(req.payload.code_on === req.payload.code_off) {
		return res({error: "CODES_IDENTICAL"}).code(400);
	} else {
		Receiver.findOne({$or : [{name: req.payload.name}, {code_on: req.payload.code_on}, {code_on: req.payload.code_off}, {code_off: req.payload.code_on}, {code_off: req.payload.code_off}]}, function (err, receiver) {
		    if(!!err) { return res({error: err}).code(500); }
		    if(!!receiver) {
		    	if(req.payload.name === receiver.name) { return res({error: "NAME_ALREADY_IN_USE"}).code(409); }
		    	if(req.payload.code_on === receiver.code_on || req.payload.code_on === receiver.code_off) { return res({error: "CODE_ON_ALREADY_IN_USE"}).code(409); }
		    	if(req.payload.code_off === receiver.code_off || req.payload.code_off === receiver.code_on) { return res({error: "CODE_OFF_ALREADY_IN_USE"}).code(409); }
		    }
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
	}
};

exports.updateOne = function(req, res) {
	if(req.payload.code_on === req.payload.code_off) {
		return res({error: "CODES_IDENTICAL"}).code(400);
	} else {
		Receiver.findById(req.payload._id, function (err, receiver) {
		    if(!!err) { return res({error: err}).code(500); }
		    if(!receiver) { return res({error: "RECEIVER_NOT_FOUND"}).code(404); }
		    Receiver.find({$or : [{_id: req.payload._id}, {name: req.payload.name}, {code_on: req.payload.code_on}, {code_on: req.payload.code_off}, {code_off: req.payload.code_on}, {code_off: req.payload.code_off}]}, function (err, receivers) {
		    	if(receivers.length === 1 && receivers[0]._id.toString() === receiver._id.toString()) {
		    		
		    		if(!!req.payload.name) {
						receiver.name = req.payload.name;
					}
					if(!!req.payload.code_on) {
						receiver.code_on = req.payload.code_on;
					}
					if(!!req.payload.code_off) {
						receiver.code_off = req.payload.code_off;
					}
					receiver.save();
					return res().code(204);
		    		
		    	} else {
					for(var index in receivers) {
		    			if(receivers[index]._id.toString() !== receiver._id.toString()) {
		    				if(req.payload.name === receivers[index].name) { return res({error: "NAME_ALREADY_IN_USE"}).code(409); }
		    				if(req.payload.code_on === receivers[index].code_on || req.payload.code_on === receivers[index].code_off) { return res({error: "CODE_ON_ALREADY_IN_USE"}).code(409); }
		    				if(req.payload.code_off === receivers[index].code_off || req.payload.code_off === receivers[index].code_on) { return res({error: "CODE_OFF_ALREADY_IN_USE"}).code(409); }
		    			}
		    		}
				}
			});
		});
	}
};

exports.deleteOne = function(req, res) {
  Receiver.findById(req.params.id, function(err, receiver){
  	if(!!err) { return res({error: err}).code(500); }
  	if(!receiver) { return res({error: "RECEIVER_NOT_FOUND"}).code(404); }
  	receiver.remove(function(err) {
  		if(!!err) {
  			if(!!err) { return res({error: err}).code(500); }
  		}
  		return res().code(204);
  	});
  });
};

exports.emitOff = function(req, res) {
	Receiver.findById(req.params.id, function (err, receiver) {
	    if(!!err) { return res({error: err}).code(500); }
	    if(!receiver) { return res({error: "RECEIVER_NOT_FOUND"}).code(404); }
	    process.emit(receiver.code_off, function(err) {
	    	if(!!err) return res({error: "EMIT_ERROR"}).code(500);
	    	return res().code(204);
	    });
	  });
};

exports.emitOn = function(req, res) {
	Receiver.findById(req.params.id, function (err, receiver) {
	    if(!!err) { return res({error: err}).code(500); }
	    if(!receiver) { return res({error: "RECEIVER_NOT_FOUND"}).code(404); }
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