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
		    handler: controller.create,
		    config: {
		        payload: {
		        	timeout: 30000,
		        	maxBytes: 50 * 1024 * 1024,
		            parse: true,
		            output: 'stream',
					allow: 'multipart/form-data'
		        }
		    }
		},
		{
		    method: 'DELETE',
		    path: '/api/picture/{id}',
		    handler: controller.delete
		}
	];

module.exports = routes;