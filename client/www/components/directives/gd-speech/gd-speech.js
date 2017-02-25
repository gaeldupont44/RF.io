(function () {
  'use strict';
  angular.module('gd-speech', [])
    .directive('gdSpeech', ['gdSpeechFactory',
    
    function (gdSpeechFactory) {
      return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        require: '^ngModel',
        scope: { ngModel: '=', onGdSpeechComplete: '&' },
        template:
            '<div style="display: table; width: 33px; height: 33px; background-color: black; border-radius: 50%; text-align: center; color: red;" ng-click="toggleStartStop()">' +
                '<i style="display: table-cell; vertical-align: middle; height: 100%; font-size: 25px;" class="icon ion-android-microphone-off" ng-hide="ngModel.recognizing"></i>' +
                '<i style="display: table-cell; vertical-align: middle; height: 100%; font-size: 25px;" class="icon ion-android-microphone" ng-show="ngModel.recognizing"></i>' +
            '</div>',
        link: function (scope, element, attrs, ngModel) {
          var $scope, init, onresult, onstart, recognition, recognizing, reset, safeApply, setMsg, upgrade;
          $scope = scope;
          $scope.onGdSpeechComplete = $scope.onGdSpeechComplete || angular.noop;
          recognizing = false;
          recognition = null;
          $scope.speech = {
            msg: gdSpeechFactory.messages.info_setup,
            recognizing: false
          };
          safeApply = function (fn) {
            var phase;
            phase = scope.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
              if (fn && typeof fn === 'function') {
                return fn();
              }
            } else {
              return scope.$apply(fn);
            }
          };
          setMsg = function (msg) {
            return safeApply(function () {
              return $scope.speech.msg = gdSpeechFactory.messages[msg];
            });
          };
          init = function () {
            reset();
            if ('webkitSpeechRecognition' in window) {
              recognition = new webkitSpeechRecognition();
              recognition.continuous = !!$scope.ngModel.config.continuous;
              recognition.interimResults = !!$scope.ngModel.config.interimResults;
              recognition.onerror = onerror;
              recognition.onend = reset;
              recognition.onresult = onresult;
              return recognition.onstart = onstart;
            } else {
              recognition = {};
              return upgrade();
            }
          };
          upgrade = function () {
            setMsg('info_upgrade');
          };
          onstart = function (event) {
            var onerror;
            $scope.ngModel.recognizing = true;
            setMsg('info_speak_now');
            console.log('onstart', event);
            return onerror = function (event, message) {
              console.log('onerror', event, message);
              $scope.ngModel.recognizing = false;
              switch (event.error) {
              case 'not-allowed':
                return setMsg('info_blocked');
              case 'no-speech':
                return setMsg('info_no_speech');
              case 'service-not-allowed':
                return setMsg('info_denied');
              default:
                return console.log(event);
              }
            };
          };
          onresult = function (event) {
            var i, result, resultIndex, trans, _results;
            setMsg('info_speak_now');
            resultIndex = event.resultIndex;
            trans = '';
            i = resultIndex;
            _results = [];
            while (i < event.results.length) {
              result = event.results[i][0];
              trans = gdSpeechFactory.capitalize(result.transcript);
              
              if (event.results[i].isFinal) {
                safeApply(function () {
                  $scope.ngModel.value.complete = trans;
                  $scope.ngModel.value.interim = null;
                  $scope.onGdSpeechComplete();
                  return $scope.ngModel.recognizing = false;
                });
              } else {
              	safeApply(function () {
                $scope.ngModel.value.interim = trans;
                return $scope.ngModel.recognizing = true;
              });
              }
              _results.push(++i);
            }
            return _results;
          };
          reset = function (event) {
            console.log('reset', event);
            $scope.ngModel.recognizing = false;
            setMsg('info_setup');
            return $scope.abort = function () {
              return $scope.toggleStartStop();
            };
          };
          $scope.toggleStartStop = function () {
            if ($scope.ngModel.recognizing) {
              recognition.stop();
              reset();
            } else {
              recognition.start();
              $scope.ngModel.recognizing = true;
            }
          };
          return init();
        }
      };
    }
  ])
  .service('gdSpeechFactory', [
    function () {
      var first_char, gdSpeechFactory, one_line, two_line;
      two_line = /\n\n/g;
      one_line = /\n/g;
      first_char = /\S/;
      return gdSpeechFactory = {
        messages: {
          info_speak_now: 'Speak now... or <a href="#" ng-click="reset()">Cancel</a>',
          info_stop: 'Proccessing your voice...',
          info_no_speech: 'No Speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
          info_no_mic: 'No microphone was found. Ensure that a microphone is installed.',
          info_blocked: 'Permission to use microphone is blocked. To change, go to <a href="chrome://settings/contentExceptions#media-stream">chrome://settings/contentExceptions#media-stream</a>.',
          info_denied: 'Permission to use microphone was denied.',
          info_setup: 'Click on the microphone icon to enable Web Speech.',
          info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome" target="_blank">Chrome</a> version 25 or later.',
          info_allow: 'Click the "Allow" button above to enable your microphone.'
        },
        linebreak: function (s) {
          return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
        },
        capitalize: function (s) {
          return s.replace(first_char, function (m) {
            return m.toUpperCase();
          });
        }
      };
    }
  ]);
})();
  