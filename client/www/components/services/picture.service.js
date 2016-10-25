angular.module('RFio')
.factory('PictureService', PictureService);

function PictureService($q, $rootScope, HttpService, WebsqlService) {
	
	var dbTableName = "PICTURE";
	
	var dbTableFields = {
		"__v": {
			"type": "TEXT"
		},
		"_id": {
			"type": "TEXT",
			"null": "NOT NULL"
		},
		"typeMime": {
			"type": "TEXT",
			"null": "NOT NULL"
		},
		"base64": {
			"type": "TEXT",
			"null": "NOT NULL"
		}
	};
	
	WebsqlService.createTable(dbTableName, dbTableFields);
	
	return {
		create: create,
		delete: del,
		get: get
	};
	
	function create(data) {
		return HttpService.post(API.Routes.Pictures, {}, data);
	}
	
	function del(id) {
		return HttpService.delete(API.Routes.Picture, { id: id });
	}
	
	function get(id) {
		
		var deferred = $q.defer();
		
		function request() {
			HttpService.get(API.Routes.Picture, { id: id })
				.then(function(picture) {
					WebsqlService.insert(dbTableName, picture);
					deferred.resolve(picture);
				})
				.catch(function(err) {
					deferred.reject(err);
				});
		}
		
		if(!!$rootScope.hasWebSql) {
		
			WebsqlService.select(dbTableName, {
				_id: {
					value: id
				}
			})
				.then(function(result) {
					if(result.rows.length > 0) {
						deferred.resolve(result.rows.item(0));
					} else {
						request();
					}
				});
		} else {
			request();
		}
		
			
		return deferred.promise;
    }
}