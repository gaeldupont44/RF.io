angular.module('RFio.bridges')
.factory('BridgesService', BridgesService);

function BridgesService(HttpService, SocketioService) {
	
	return {
		create: create,
		delete: del,
		get: get,
		update: update,
		syncUpdates: syncUpdates,
		unsyncUpdates: unsyncUpdates
	};
	
	function create(data) {
		return HttpService.post(API.Routes.Bridges, {}, data);
	}
	
	function del(id) {
		return HttpService.delete(API.Routes.Bridge, { id: id });
	}
	
	function get() {
		return HttpService.get(API.Routes.Bridges);
	}
	
	function update(data) {
		return HttpService.put(API.Routes.Bridges, {}, data);
	}
	
	function syncUpdates(bridges){
    	SocketioService.syncUpdates("bridge", bridges);
    }
    
    function unsyncUpdates() {
		SocketioService.unsyncUpdates("bridge");
    }
}