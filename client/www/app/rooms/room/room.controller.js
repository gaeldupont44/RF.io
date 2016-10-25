angular.module('RFio.rooms')
.controller('RoomCtrl', function($q, $stateParams, LoaderService, PictureService, RoomService) {
  
  var vm = this;
  vm.roomName = $stateParams.name;
  vm.room = null;
  
  function get() {
  	LoaderService.show();
  	RoomService.getByName(vm.roomName)
  		.then(function(room) {
  			vm.room = room;
  			updatePicture().finally(LoaderService.hide);
  			RoomService.syncOneUpdates(vm.room, function(event, room) {
  				LoaderService.show();
				updatePicture().finally(LoaderService.hide);
		  	});
  		})
  		.catch(function(err) {
  			LoaderService.hide();
  		});
  }
	
  function updatePicture() {
  	var deferred = $q.defer();
  	if(!!vm.room.picture) {
  		if(vm.room.pictureId === vm.room.picture._id) {
  			deferred.resolve(vm.room.picture);
  		} else {
  			PictureService.get(vm.room.pictureId)
	  			.then(function(picture) {
	  				vm.room.picture = picture;
	  				deferred.resolve();
	  			})
	  			.catch(function(err) {
	  				deferred.reject(err);
	  			});
  		}
  	} else {
  		PictureService.get(vm.room.pictureId)
	  		.then(function(picture) {
	  			vm.room.picture = picture;
	  			deferred.resolve();
	  		})
	  		.catch(function(err) {
	  			deferred.reject(err);
	  		});
  	}
  	return deferred.promise;
  }
  
  get();
  
});