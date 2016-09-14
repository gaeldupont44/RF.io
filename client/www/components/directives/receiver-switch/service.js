angular.module('RFio')
.factory('ReceiverDirectiveService', ReceiverDirectiveService);

function ReceiverDirectiveService(HttpService, SocketioService) {
	
	return {
		emitOn: emitOn,
		emitOff: emitOff
	};
	
	function emitOff(id) {
		return HttpService.get(API.Routes.ReceiverOff, { id: id });
	}

	function emitOn(id) {
		return HttpService.get(API.Routes.ReceiverOn, { id: id });
	}
}