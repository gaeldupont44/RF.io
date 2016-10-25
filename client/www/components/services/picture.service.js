angular.module('RFio')
.factory('PictureService', PictureService);

function PictureService(HttpService) {
	
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
		return HttpService.get(API.Routes.Picture, { id: id });
    }
}