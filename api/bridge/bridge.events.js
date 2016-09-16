'use strict';

const EventEmitter =  require('events');
const Bridge = require('./bridge.model');
const BridgeEvents = new EventEmitter();


// Set max event listeners (0 == unlimited)
BridgeEvents.setMaxListeners(0);

// Model events
const events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bridge.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BridgeEvents.emit(event, doc);
  };
}

module.exports = BridgeEvents;