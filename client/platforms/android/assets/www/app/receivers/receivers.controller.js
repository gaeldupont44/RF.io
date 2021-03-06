angular.module('RFio.receivers')

.controller('ReceiversCtrl', function($ionicModal, $rootScope, $scope, LoaderService, ReceiversService) {
  
  var _createModal;
  var _updateModal;
  
  var vm = this;
  vm.receiver = {};
  vm.closeCreateReceiverModal = closeCreateReceiverModal;
  vm.closeUpdateReceiverModal = closeUpdateReceiverModal;
  vm.create = create;
  vm.delete = del;
  vm.openCreateReceiverModal = openCreateReceiverModal;
  vm.openUpdateReceiverModal = openUpdateReceiverModal;
  vm.receivers = [];
  vm.update = update;
  vm.speech = {
    config: {
      continuous: true,
      interimResults: true
    },
    value: {
      interim: '',
      complete: ''
    },
    recognizing: false
  };
  
  // Create the new receiver modal that we will use later
  $ionicModal.fromTemplateUrl('app/receivers/receivers-create.modal.html', {
    scope: $scope
  }).then(function(modal) {
    _createModal = modal;
  });

  // Create the new receiver modal that we will use later
  $ionicModal.fromTemplateUrl('app/receivers/receivers-update.modal.html', {
    scope: $scope
  }).then(function(modal) {
    _updateModal = modal;
  });

  function closeCreateReceiverModal() {
    _createModal.hide();
  }
  function closeUpdateReceiverModal() {
    _updateModal.hide();
  }
  
  function create() {
  	LoaderService.show();
    ReceiversService.create(vm.receiver)
    	.then(function() {
    		closeCreateReceiverModal();
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
    ReceiversService.delete(vm.receiver._id)
    	.then(function() {
    		closeUpdateReceiverModal();
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
  	ReceiversService.get()
  		.then(function(receivers) {
  			vm.receivers = receivers;
  			ReceiversService.syncUpdates(vm.receivers);
  		})
  		.finally(function() {
  			LoaderService.hide();
  		});
  }
  
  function openCreateReceiverModal() {
  	vm.receiver = {};
    _createModal.show();
  }
  
  function openUpdateReceiverModal(receiverId) {
  	vm.receiver = angular.copy(_.find(vm.receivers, {_id: receiverId}));
    _updateModal.show();
  }
  
  function update() {
  	LoaderService.show();
    ReceiversService.update(vm.receiver)
    	.then(function() {
    		closeUpdateReceiverModal();
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