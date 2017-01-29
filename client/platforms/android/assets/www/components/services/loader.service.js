angular.module('RFio')
.factory("LoaderService", LoaderService);

function LoaderService($ionicLoading) {
  	
  	return {
  		hide: hide,
  		show: show
  	};
  	
  	function show(msg){
  		$ionicLoading.show({
      		template: msg || 'Chargement en cours...'
	    });
  	}
  	
  	function hide(){
  		$ionicLoading.hide();
  	}
  	
}