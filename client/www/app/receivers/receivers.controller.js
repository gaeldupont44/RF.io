angular.module('RFio.receivers')

.controller('ReceiversCtrl', function($scope, $ionicModal, ReceiversService, LoaderService) {

  var vm = this;
  vm.newReceiver = {};
  vm.closeNewReceiverModal = closeNewReceiverModal;
  vm.doNewReceiver = doNewReceiver;
  vm.openNewReceiverModal = openNewReceiverModal;
  vm.receivers = [];
  
  // Create the new receiver modal that we will use later
  $ionicModal.fromTemplateUrl('app/receivers/receivers-modal.html', {
    scope: $scope
  }).then(function(modal) {
    _modal = modal;
  });


  function closeNewReceiverModal() {
    _modal.hide();
  }
  
  function doNewReceiver() {
    ReceiversService.create(vm.newReceiver)
    	.then(function() {
    		closeNewReceiverModal();
    	})
    	.catch(function(err) {
    		console.log(err);
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
  
  function openNewReceiverModal() {
    _modal.show();
  }

  get();
  
});