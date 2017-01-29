'use strict';

var controller = require('./bridge.controller');

var routes = [
		{
		    method: 'GET',
		    path: '/api/bridge',
		    handler: controller.getAll
		},
		{
	        method: 'GET',
	    	path: '/api/bridge/{id}',
	    	handler: controller.getOne
		},
		{
		    method: 'POST',
		    path: '/api/bridge',
		    handler: controller.createOne
		},
		{
		    method: 'PUT',
		    path: '/api/bridge',
		    handler: controller.updateOne
		},
		{
		    method: 'DELETE',
		    path: '/api/bridge/{id}',
		    handler: controller.deleteOne
		}
	];

module.exports = routes;

