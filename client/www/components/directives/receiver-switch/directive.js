'use strict';
angular.module('RFio')
.directive('receiverSwitch', function(){

	return {
		replace: true,
		restrict: 'E',
		scope: {
			ngModel: "="
		},
		templateUrl: 'components/directives/receiver-switch/template.html',
		controller: 'ReceiverDirectiveCtrl',
		controllerAs: 'vm',
		link: function(scope, element, attrs) {
			
		}
	};

});