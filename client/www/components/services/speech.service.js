angular.module('RFio')
.factory('SpeechService', SpeechService);

function SpeechService($q, $rootScope, HttpService) {

	return {
		process : function(speech) {
			return HttpService.get(API.Routes.Speech, { speech: speech });
		}
	};
}