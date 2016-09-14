angular.module('RFio')

.controller('ReceiverDirectiveCtrl', function($scope, ReceiverDirectiveService, LoaderService) {

  var vm = this;
  vm.receiver = $scope.ngModel;
  vm.change = change;
  
  function change() {
  	if(!vm.receiver.state) {
		emitOn();
  	} else {
  		emitOff();
  	}
  }
  
  function emitOn() {
  	LoaderService.show();
  	ReceiverDirectiveService.emitOn(vm.receiver._id)
  		.finally(LoaderService.hide);
  }
  
  function emitOff() {
  	LoaderService.show();
  	ReceiverDirectiveService.emitOff(vm.receiver._id)
  		.finally(LoaderService.hide);
  }
  
});