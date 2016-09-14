'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config');
const server = new Hapi.Server();

server.connection({ routes: { cors: true }, port: config.port });

const socketio = require('socket.io')(server.listener, {
  transports: ['websocket', 'polling'],
  path: '/socket.io-client'
});

require('./socketio')(socketio);
require('./api/receiver/receiver.process').listen();

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

process.on('uncaughtException', function (err) {
  console.error(err);
});

server.register(require('inert'), (err) => {
    if (!!err) console.error(err);
});

server.route(
	{
        method: 'GET',
    	path: '/{param*}',
    	handler: {
        	directory: {
				path: "client/www",
				index: true
    	    }
    	}
    }
);

require('./routes')(server);

server.start((err) => {
    if (!!err) throw err;
    console.log('Server running at:', server.info.uri);
});
