'use strict';

const EventEmitter =  require('events');
const Receiver = require('./receiver.model');
const ReceiverEvents = new EventEmitter();


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
  return function(doc) {
    ReceiverEvents.emit(event, doc);
  };
}

module.exports = ReceiverEvents;