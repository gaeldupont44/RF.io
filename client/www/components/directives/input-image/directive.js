'use strict';
angular.module('RFio')
.directive('inputImage', function(){

	return {
		replace: false,
		restrict: 'E',
		scope: {
			ngModel: "="
		},
		templateUrl: 'components/directives/input-image/template.html',
		link: function(scope, element, attrs) {
			element.bind("change", function(event) {
				if (event.target.files && event.target.files[0]) {
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.ngModel = e.target.result;
						scope.$apply();
					};
					reader.readAsDataURL( event.target.files[0] );
				}
			});
		}
	};

});