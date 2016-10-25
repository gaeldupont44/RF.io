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
						var parseResult = e.target.result.split(";base64,");
						scope.ngModel = {
							typeMime: parseResult[0].split("data:")[1],
							base64: parseResult[1]
						};
						scope.$apply();
					};
					reader.readAsDataURL( event.target.files[0] );
				}
			});
		}
	};

});