/**
 * Broadcast updates to client when the model changes
 */

'use strict';

const RoomEvents = require('./room.events');

// Model events to emit
var events = ['save', 'remove'];

module.exports = function (socketio) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener(event, socketio);
    RoomEvents.on(event, listener);
  }
};

function createListener(event, socketio) {
  return function(room) {
  	socketio.emit('room-' + room._id + ':' + event, room);
    socketio.emit('room:' + event, room);
  };
}