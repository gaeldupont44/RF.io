(function () {
  'use strict';
  angular.module('gd-speech')
  	.directive('gdSpeechModal', [
    'gdSpeechFactory',
    function (gdSpeechFactory) {
      return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        require: '^ngModel',
        scope: { ngModel: '=' },
        template:
            '<div ' +
            	'class="gd-speech-modal-container" ' +
            	'ng-show="!!ngModel.recognizing">' +
            	'<div class="gd-speech-modal-content">' +
            		'<div class="gd-speech-modal-button-container">' +
	            		'<div class="gd-speech-modal-button-content">' +
	                		'<i style="display: table-cell; vertical-align: middle; height: 100%; font-size: 25px;" class="icon ion-android-microphone-off" ng-hide="ngModel.recognizing"></i>' +
	            			'<i style="display: table-cell; vertical-align: middle; height: 100%; font-size: 25px;" class="icon ion-android-microphone" ng-show="ngModel.recognizing"></i>' +
	            		'</div>' +
	            	'</div>' +
            		'<div class="gd-speech-modal-interim" ng-if="!!ngModel.config.interimResults && !!ngModel.value.interim" ng-bind="ngModel.value.interim"></div>' +
            '</div>',
      };
    }
  ]);
})();