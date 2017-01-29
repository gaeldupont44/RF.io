'use strict';

var controller = require('./room.controller');

var routes = [
		{
		    method: 'GET',
		    path: '/api/room',
		    handler: controller.getAll
		},
		{
	        method: 'GET',
	    	path: '/api/room/{id}',
	    	handler: controller.getOne
		},
		{
	        method: 'GET',
	    	path: '/api/room/name/{name}',
	    	handler: controller.getByName
		},
		{
		    method: 'POST',
		    path: '/api/room',
		    handler: controller.createOne
		},
		{
		    method: 'PUT',
		    path: '/api/room',
		    handler: controller.updateOne
		},
		{
		    method: 'DELETE',
		    path: '/api/room/{id}',
		    handler: controller.deleteOne
		}
	];

module.exports = routes;

