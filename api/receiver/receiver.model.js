'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var ReceiverSchema = new Schema({
  name: { type: String, required: true },
  code_off: { type: Number, required: true },
  code_on: { type: Number, required: true },
  image_off: { type: String, required: false },
  image_on: { type: String, required: false },
  state: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('Receiver', ReceiverSchema);
