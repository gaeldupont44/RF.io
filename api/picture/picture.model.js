'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
const PictureSchema = new Schema({
  typeMime: { type: String, required: true },
  base64: { type: String, required: true }
});

module.exports = mongoose.model('Picture', PictureSchema);