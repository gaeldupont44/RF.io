'use strict';

var controller = require('./picture.controller');

var routes = [
		{
	        method: 'GET',
	    	path: '/api/picture/{id}',
	    	handler: controller.get
		},
		{
		    method: 'POST',
		    path: '/api/picture',
		    handler: controller.create
		},
		{
		    method: 'DELETE',
		    path: '/api/picture/{id}',
		    handler: controller.delete
		}
	];

module.exports = routes;

