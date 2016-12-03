/**
 * Socket.io configuration
 */
'use strict';

// When the user disconnects.. perform this
function onDisconnect(socket) {
	//disconnected
}

// When the user connects.. perform this
function onConnect(socket) {
	socket.emit("connected");
}

module.exports = function(socketio) {
	
  require('./api/bridge/bridge.socketio')(socketio);
  require('./api/receiver/receiver.socketio')(socketio);
  require('./api/room/room.socketio')(socketio);
  
  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();
	
    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
    });

    // Call onConnect.
    onConnect(socket);
    
  });
};
