angular.module('RFio')
.factory("HttpService", HttpService);

function HttpService($http) {
	
	var _timeout = 15000;
  	
  	return {
  		checkAPI: checkAPI,
  		delete: del,
  		get: get,
  		post: post,
  		put: put,
  		upload: upload
  	};
  	
  	function checkAPI() {
		return get(API.Routes.Check);
	}
	
  	function del(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "DELETE",
		    data: data,
		    timeout: _timeout
		 })
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
  	function get(url, params){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "GET",
		    timeout: _timeout
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
	function parseUrl(url, params) {
		if(!!params) {
			if(url.split('{').length-1 === url.split('}').length-1 && url.split('{').length-1 === _.keys(params).length) {
				_.forOwn(params, function(value, key) {
					url = url.replace(new RegExp('{' + key+ '}', 'gi'), value);
				});
			}
		}
		return ((!!API.Host && API.Host.length > 0 ) ? API.Host + ((!!API.Port && API.Port.toString().length > 0) ? ":" + API.Port : "") : "") + url;
	}
	
  	function post(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "POST",
		    data: data
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
  	function put(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "PUT",
		    data: data
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
  	function upload(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "POST",
		    data: data,
		    headers : {
	    		'Content-Type' : undefined
	   		},
	 		transformRequest : angular.identity
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
}