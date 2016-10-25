// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('RFio', ['ionic', 'angularjs-dropdown-multiselect', 'angular-websql', 'btford.socket-io', 'RFio.bridges', 'RFio.receivers', 'RFio.rooms'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.controller('AppCtrl', function($ionicPopup, $scope, HttpService, SocketioService, LoaderService) {
	var _popup;
	
	var vm = this;
	vm.checkAPI = checkAPI;
	
	
	var popupData = {
	    template: 'Impossible de se connecter au serveur.',
	    title: 'Erreur réseau',
	    subTitle: 'Serveur inaccessible',
	    scope: $scope
  	};
  	
	function checkAPI() {
		LoaderService.show();
		HttpService.checkAPI()
			.then(function() {
				SocketioService.connect();
			})
			.catch(function() {
				_popup = $ionicPopup.alert(popupData).then(checkAPI);
			})
			.finally(function() {
				LoaderService.hide();	
			});
	}
	
	checkAPI();
	
})
.config(function($stateProvider, $urlRouterProvider) {
	
  $stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
	.state('app.bridges', {
		url: '/bridges',
		views: {
	      	'menuContent': {
				templateUrl: 'app/bridges/bridges.html',
				controller: 'BridgesCtrl',
				controllerAs: 'vm'
			}
		}
	})
	.state('app.receivers', {
		url: '/receivers',
		views: {
	      	'menuContent': {
				templateUrl: 'app/receivers/receivers.html',
				controller: 'ReceiversCtrl',
				controllerAs: 'vm'
			}
		}
	})
	.state('app.rooms', {
		url: '/rooms',
		views: {
	      	'menuContent': {
				templateUrl: 'app/rooms/rooms.html',
				controller: 'RoomsCtrl',
				controllerAs: 'vm'
			}
		}
	})
	.state('app.room', {
		url: '/rooms/:name',
		views: {
	      	'menuContent': {
				templateUrl: 'app/rooms/room/room.html',
				controller: 'RoomCtrl',
				controllerAs: 'vm'
			}
		}
	});
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/receivers');
});
