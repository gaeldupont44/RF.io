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
		},
		link: function (scope, element, attr) {
			element[0].firstElementChild.onload =  function (event) {
				scope.mapLoaded = true;
          	};
		}
	};

});