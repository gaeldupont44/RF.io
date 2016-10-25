'use strict';
const _ = require("lodash");
const Picture = require('./picture.model');

exports.get = function(req, res) {
	Picture.findById(req.params.id, function (err, picture) {
	    if(!!err) { return res({error: err}).code(500); }
	    if(!picture) { return res({error: "PICTURE_NOT_FOUND"}).code(404); }
	    return res(picture).code(200);
	  });
};

exports.create = function(req, res) {
		var picture = new Picture({
			typeMime: req.payload.typeMime,
			base64: req.payload.base64
	   	});
		picture.save();
		return res(picture._id).code(201);
};

exports.delete = function(req, res) {
  Picture.findById(req.params.id, function(err, picture){
  	if(!!err) { return res({error: err}).code(500); }
  	if(!picture) { return res({error: "PICTURE_NOT_FOUND"}).code(404); }
  	picture.remove(function(err) {
  		if(!!err) { return res({error: err}).code(500); }
  		return res().code(204);
  	});
  });
};