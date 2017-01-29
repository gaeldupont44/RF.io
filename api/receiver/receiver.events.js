'use strict';
const _ = require('lodash');
const EventEmitter =  require('events');
const Receiver = require('./receiver.model');
const ReceiverEvents = new EventEmitter();
const Room = require('./../room/room.model');

// Set max event listeners (0 == unlimited)
ReceiverEvents.setMaxListeners(0);

// Model events
const events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Receiver.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(receiver) {
  	ReceiverEvents.emit(event, receiver);
  	Room.find({'roomObjects.receiver': receiver._id}, function(err, rooms) {
  		if(err) console.error(err);
  		_(rooms).forEach(function(room) {
  			if(event === 'remove') {
  				room.roomObjects.receiver(receiver._id).remove();
  			}
  			room.save();
  		});
  	});
  };
}

module.exports = ReceiverEvents;