angular.module('RFio.rooms')
.controller('RoomCtrl', function($stateParams, LoaderService, RoomService) {
  
  var vm = this;
  vm.roomName = $stateParams.name;
  vm.room = null;
  
  function get() {
  	LoaderService.show();
  	RoomService.getByName(vm.roomName)
  		.then(function(room) {
  			vm.room = room;
  			RoomService.syncOneUpdates(vm.room);
  		})
  		.finally(function() {
  			LoaderService.hide();
  		});
  }

  get();
});