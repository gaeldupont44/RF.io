'use strict';
angular.module('RFio')
.directive('mapImage', function($interval){

	return {
		replace: true,
		restrict: 'EA',
		templateUrl: 'components/directives/room-map/template.html',
		scope: {
			map: '=',
			roomObjects: '=',
			canDrag: '=',
			canSwitch: '=',
			delegateHandle: "@"
		}
	};

});