'use strict';
const RoomObject = require('./object/object.model');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
const RoomSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  roomObjects: [RoomObject.schema]
});

module.exports = mongoose.model('Room', RoomSchema);