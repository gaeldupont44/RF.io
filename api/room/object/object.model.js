'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
const RoomObjectSchema = new Schema({
  receiver: { type: Schema.Types.ObjectId, ref: 'Receiver', required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

module.exports = mongoose.model('RoomObject', RoomObjectSchema);