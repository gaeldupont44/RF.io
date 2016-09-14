/**
 * Main application routes
 */

'use strict';

module.exports = function(server) {
	server.route(require('./api/check'));
	server.route(require('./api/receiver'));
};
