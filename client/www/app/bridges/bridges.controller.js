angular.module('RFio.bridges')

.controller('BridgesCtrl', function($ionicModal, $rootScope, $scope, LoaderService, BridgesService) {
  
  var _createModal;
  var _updateModal;
  
  var vm = this;
  vm.newBridge = {};
  vm.closeCreateBridgeModal = closeCreateBridgeModal;
  vm.closeUpdateBridgeModal = closeUpdateBridgeModal;
  vm.create = create;
  vm.delete = del;
  vm.openCreateBridgeModal = openCreateBridgeModal;
  vm.openUpdateBridgeModal = openUpdateBridgeModal;
  vm.bridges = [];
  vm.update = update;
  
  // Create the new bridge modal that we will use later
  $ionicModal.fromTemplateUrl('app/bridges/bridges-create.modal.html', {
    scope: $scope
  }).then(function(modal) {
    _createModal = modal;
  });

  // Create the new bridge modal that we will use later
  $ionicModal.fromTemplateUrl('app/bridges/bridges-update.modal.html', {
    scope: $scope
  }).then(function(modal) {
    _updateModal = modal;
  });

  function closeCreateBridgeModal() {
    _createModal.hide();
  }
  function closeUpdateBridgeModal() {
    _updateModal.hide();
  }
  
  function create() {
  	LoaderService.show();
    BridgesService.create(vm.newBridge)
    	.then(function() {
    		closeCreateBridgeModal();
    	})
    	.catch(function(err) {
    		console.log(err);
    	})
    	.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  function del() {
  	LoaderService.show();
    BridgesService.delete(vm.bridge._id)
    	.then(function() {
    		closeUpdateBridgeModal();
    	})
    	.catch(function(err) {
    		console.log(err);
    	})
    	.finally(function() {
  			LoaderService.hide();
  		});
  }
  function get() {
  	LoaderService.show();
  	BridgesService.get()
  		.then(function(bridges) {
  			vm.bridges = bridges;
  			BridgesService.syncUpdates(vm.bridges);
  		})
  		.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  function openCreateBridgeModal() {
    _createModal.show();
  }
  
  function openUpdateBridgeModal(bridgeId) {
  	vm.bridge = angular.copy(_.find(vm.bridges, {_id: bridgeId}));
    _updateModal.show();
  }
  
  function update() {
  	LoaderService.show();
    BridgesService.update(vm.bridge)
    	.then(function() {
    		closeUpdateBridgeModal();
    	})
    	.catch(function(err) {
    		console.log(err);
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