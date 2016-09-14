angular.module('RFio.receivers')
.factory('ReceiversService', ReceiversService);

function ReceiversService(HttpService, SocketioService) {
	
	return {
		create: create,
		delete: del,
		get: get
	};
	
	function create(data) {
		return HttpService.post(API.Routes.Receivers, {}, data);
	}
	
	function del(id) {
		return HttpService.delete(API.Routes.Receiver, { id: id });
	}
	
	function get() {
		return HttpService.get(API.Routes.Receivers);
	}

}