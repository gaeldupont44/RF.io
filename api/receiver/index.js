'use strict';

var controller = require('./receiver.controller');

var routes = [
		{
		    method: 'GET',
		    path: '/api/receiver',
		    handler: controller.getAll
		},
		{
	        method: 'GET',
	    	path: '/api/receiver/{id}',
	    	handler: controller.getOne
		},
		{
	        method: 'GET',
	    	path: '/api/receiver/{id}/off',
	    	handler: controller.emitOff
		},
		{
	        method: 'GET',
	    	path: '/api/receiver/{id}/on',
	    	handler: controller.emitOn
		},
		{
		    method: 'POST',
		    path: '/api/receiver',
		    handler: controller.createOne
		},
		{
		    method: 'PUT',
		    path: '/api/receiver',
		    handler: controller.updateOne
		},
		{
		    method: 'DELETE',
		    path: '/api/receiver/{id}',
		    handler: controller.deleteOne
		}
	];

module.exports = routes;

