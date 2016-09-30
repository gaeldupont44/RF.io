angular.module('RFio.rooms')

.controller('RoomsCtrl', function($ionicModal, $q, $rootScope, $scope, LoaderService, ReceiversService, RoomsService) {
  
  var _createModal;
  var _updateModal;
  
  var vm = this;
  vm.selector = {
    	translations: {
    		buttonDefaultText: 'Sélectionner des récepteurs',
    		checkAll: "Tout sélectionner",
    		uncheckAll: "Tout désélectionner",
    		dynamicButtonTextSuffix: 'récepteur(s) sélectionné(s)',
    		selectionCount: 'récepteur(s) sélectionné(s)'
    	},
    	settings: {externalIdProp: '', scrollable: false, displayProp: 'name', idProp: 'name'},
    	options: [],
    	data: []
    };
    
  vm.newRoom = {};
  vm.closeCreateRoomModal = closeCreateRoomModal;
  vm.closeUpdateRoomModal = closeUpdateRoomModal;
  vm.create = create;
  vm.delete = del;
  vm.openCreateRoomModal = openCreateRoomModal;
  vm.openUpdateRoomModal = openUpdateRoomModal;
  vm.room = {};
  vm.rooms = [];
  vm.update = update;
  
  // Create the new room modal that we will use later
  $ionicModal.fromTemplateUrl('app/rooms/rooms-create.modal.html', {
    scope: $scope
  }).then(function(modal) {
    _createModal = modal;
  });

  // Create the new room modal that we will use later
  $ionicModal.fromTemplateUrl('app/rooms/rooms-update.modal.html', {
    scope: $scope
  }).then(function(modal) {
    _updateModal = modal;
  });
  
  function _addNameToRoomObjects(roomObjects) {
  		var namedRoomObjects = [];
  		_(roomObjects).forEach(function(roomObject) {
  			roomObject.name = roomObject.receiver.name;
  			namedRoomObjects.push(roomObject);
  		});
  		return namedRoomObjects;
  }
  
  function _receiversToRoomObjects(receivers) {
  	var roomObjects = [];
  	_(receivers).forEach(function (receiver) {
  		roomObjects.push({
  			receiver: receiver,
  			x: 0,
  			y: 0,
  			name: receiver.name
  		});
  	});
  	return roomObjects;
  }
  
  function closeCreateRoomModal() {
    _createModal.hide()
    	.then(function() {
			vm.newRoom = {};
		});
  }
  
  function closeUpdateRoomModal() {
    _updateModal.hide()
    	.then(function() {
			vm.room = {};
  		});
  }
  
  function create() {
  	LoaderService.show();
  	var roomObjects = [];
  	_(vm.selector.data).forEach(function(roomObject) {
  		roomObjects.push({
  			receiver: roomObject.receiver._id,
  			x: roomObject.x,
  			y: roomObject.y
  		});
  	});
  	vm.newRoom.roomObjects = roomObjects;
    RoomsService.create(vm.newRoom)
    	.then(function() {
    		closeCreateRoomModal();
    	})
    	.catch(function(err) {
    		console.error(err);
    	})
    	.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  function del() {
  	LoaderService.show();
    RoomsService.delete(vm.room._id)
    	.then(function() {
    		closeUpdateRoomModal();
    	})
    	.catch(function(err) {
    		console.error(err);
    	})
    	.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  function get() {
  	LoaderService.show();
  	$q.all([RoomsService.get(), ReceiversService.get()])
  		.then(function(data) {
  			vm.rooms = data[0];
  			RoomsService.syncUpdates(vm.rooms);
  			vm.receivers = data[1];
  			ReceiversService.syncUpdates(vm.receivers);
  		})
  		.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  function openCreateRoomModal() {
  	vm.selector.options = _receiversToRoomObjects(angular.copy(vm.receivers));
  	vm.selector.data = [];
    _createModal.show();
  }
  
  function openUpdateRoomModal(roomId) {
  	vm.room = angular.copy(_.find(vm.rooms, {_id: roomId}));
  	vm.selector.options = _receiversToRoomObjects(angular.copy(vm.receivers));
  	vm.selector.data = angular.copy(_addNameToRoomObjects(vm.room.roomObjects));
    _updateModal.show();
  }
  
  function update() {
  	LoaderService.show();
  	var roomObjects = [];
  	_(vm.selector.data).forEach(function(roomObject) {
  		roomObjects.push({
  			receiver: roomObject.receiver._id,
  			x: roomObject.x,
  			y: roomObject.y
  		});
  	});
  	vm.room.roomObjects = roomObjects;
    RoomsService.update(vm.room)
    	.then(function() {
    		closeUpdateRoomModal();
    	})
    	.catch(function(err) {
    		console.error(err);
    	})
    	.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  $scope.$on("SOCKETIO-CONNECTED", function() {
  	get();
  });
  
  if(!!$rootScope.socketioConnected) {
  	get();
  }
  
});