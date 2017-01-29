'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var BridgeSchema = new Schema({
  code_emitter: { type: Number, required: true },
  code_receiver: { type: Number, required: true }
});

module.exports = mongoose.model('Bridge', BridgeSchema);