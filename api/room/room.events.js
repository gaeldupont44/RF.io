'use strict';

const EventEmitter =  require('events');
const Room = require('./room.model');
const RoomEvents = new EventEmitter();


// Set max event listeners (0 == unlimited)
RoomEvents.setMaxListeners(0);

// Model events
const events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Room.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
  	if(event === "save") {
  		Room.findById(doc._id).populate('roomObjects.receiver').exec(function (err, room) {
  			if(!!err) {
  				console.error(err);
  			} else {
  				RoomEvents.emit(event, room);
  			}
  		});
  	} else {
  		RoomEvents.emit(event, doc);
  	}
  	
  };
}

module.exports = RoomEvents;