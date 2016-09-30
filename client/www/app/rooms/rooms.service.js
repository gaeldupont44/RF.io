angular.module('RFio.rooms')
.factory('RoomsService', RoomsService);

function RoomsService(HttpService, SocketioService) {
	
	return {
		create: create,
		delete: del,
		get: get,
		update: update,
		syncUpdates: syncUpdates,
		unsyncUpdates: unsyncUpdates
	};
	
	function create(data) {
		return HttpService.post(API.Routes.Rooms, {}, data);
	}
	
	function del(id) {
		return HttpService.delete(API.Routes.Room, { id: id });
	}
	
	function get() {
		return HttpService.get(API.Routes.Rooms);
	}
	
	function update(data) {
		return HttpService.put(API.Routes.Rooms, {}, data);
	}
	
	function syncUpdates(rooms){
    	SocketioService.syncUpdates("room", rooms);
    }
    
    function unsyncUpdates() {
		SocketioService.unsyncUpdates("room");
    }
}