'use strict';
const _ = require("lodash");
const Room = require('./room.model');
const RoomObject = require('./object/object.model');

exports.getAll = function(req, res) {
	Room.find({}).populate('roomObjects.receiver').exec(function(err, rooms) {
    	if(!!err) { return res({error: err}).code(500); }
	    return res(rooms).code(200);
	});
};

exports.getOne = function(req, res) {
	Room.findById(req.params.id).populate('roomObjects.receiver').exec(function (err, room) {
	    if(!!err) { return res({error: err}).code(500); }
	    room.picture = JSON.parse(room.picture);
	    return res(room).code(200);
	  });
};

exports.getByName = function(req, res) {
	Room.findOne({name: req.params.name}).populate('roomObjects.receiver').exec(function (err, room) {
	    if(!!err) { return res({error: err}).code(500); }
	    return res(room).code(200);
	  });
};

exports.createOne = function(req, res) {
	Room.findOne({name: req.payload.name}, function(err, room) {
		if(!!err) { return res({error: err}).code(500); }
		if(!!room) {return res({error: "NAME_ALREADY_IN_USE"}).code(409); }
		room = new Room({
			name: req.payload.name,
			pictureId: req.payload.pictureId,
			roomObjects: req.payload.roomObjects || []
	   	});
		room.save();
		return res(room).code(201);	
	});
};

exports.updateOne = function(req, res) {
	Room.findById(req.payload._id, function (err, room) {
	    if(!!err) { return res({error: err}).code(500); }
	    if(!room) { return res({error: "ROOM_NOT_FOUND"}).code(404); }
		Room.find({name: req.payload.name}, function(err, rooms) {
			if(rooms.length === 0 || (rooms.length === 1 && rooms[0]._id.toString() === req.payload._id)) {
				room.name = req.payload.name;
				room.picture = req.payload.picture;
				room.roomObjects = req.payload.roomObjects;
				room.save();
				return res().code(204);
			} else {
				return res({error: "NAME_ALREADY_IN_USE"}).code(409);
			}
		});
	});
};

exports.deleteOne = function(req, res) {
  Room.findById(req.params.id, function(err, room){
  	if(!!err) { return res({error: err}).code(500); }
  	if(!room) { return res({error: "ROOM_NOT_FOUND"}).code(404); }
  	room.remove(function(err) {
  		if(!!err) {
  			if(!!err) { return res({error: err}).code(500); }
  		}
  		return res().code(204);
  	});
  });
};