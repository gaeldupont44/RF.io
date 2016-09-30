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
	
	function syncOneUpdates(room){
    	SocketioService.syncOneUpdates("room", room);
    }
    
    function unsyncOneUpdates(room) {
		SocketioService.unsyncOneUpdates("room", room);
    }
}