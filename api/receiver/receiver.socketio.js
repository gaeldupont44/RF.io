/**
 * Broadcast updates to client when the model changes
 */

'use strict';

const ReceiverEvents = require('./receiver.events');

// Model events to emit
var events = ['save', 'remove'];

module.exports = function (socketio) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener(event, socketio);
    ReceiverEvents.on(event, listener);
  }
};

function createListener(event, socketio) {
  return function(doc) {
    socketio.emit('receiver:' + event, doc);
  };
}