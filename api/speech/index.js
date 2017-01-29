'use strict';

var controller = require('./speech.controller');

var routes = [
		{
	        method: 'GET',
	    	path: '/api/speech/{speech}',
	    	handler: controller.process
		}
	];

module.exports = routes;

