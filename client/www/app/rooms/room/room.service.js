angular.module('RFio.rooms')
.factory('RoomService', RoomService);

function RoomService(HttpService, SocketioService) {
	
	return {
		getByName: getByName,
		syncOneUpdates: syncOneUpdates,
		unsyncOneUpdates: unsyncOneUpdates
	};
	
	function getByName(roomName) {
		return HttpService.get(API.Routes.RoomByName, {name: roomName});
	}
	
	function syncOneUpdates(room, cb){
    	SocketioService.syncOneUpdates("room", room, cb);
    }
    
    function unsyncOneUpdates(room, cb) {
		SocketioService.unsyncOneUpdates("room", room);
    }
}