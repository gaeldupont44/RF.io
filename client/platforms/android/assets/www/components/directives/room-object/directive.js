'use strict';
angular.module('RFio')
.directive('roomObject', function($ionicGesture, $ionicScrollDelegate, $timeout){

	return {
		replace: true,
		restrict: 'E',
		scope: {
			ngModel: '=',
			canDrag: '=',
			canSwitch: '=',
			delegateHandle: '=' 
		},
		templateUrl: 'components/directives/room-object/template.html',
		link: function(scope, element, attrs) {
			
			
            
            var fixCursorX = 0;
            var fixCursorY = 0;
			var mapWidth = element[0].parentElement.clientWidth;
            var mapHeight = element[0].parentElement.clientHeight - 6; // map : 2px margin-top, 2px margin-bottom | object: 1px of border-top, 1px of border-bottom
            
			$timeout(function() {
				fixCursorX = element[0].offsetWidth / 2;
				fixCursorY = element[0].offsetHeight / 2;
				var initX = scope.ngModel.x > 0 ? (scope.ngModel.x * mapWidth) - fixCursorX : 0;
				var initY = scope.ngModel.y > 0 ? (scope.ngModel.y * mapHeight) - fixCursorY : 0;
				
				//initialising position
				element.css('left', initX + "px");
            	element.css('top', initY + "px");
				element.css('opacity', "1");
			}, 100);
			
            var modals = document.querySelectorAll(".modal.active");
            var modal = {};
            if(modals.length > 0) {
            	modal = modals[0];
            }
           	
            var freezeScrollTimout;
            var freezeScroll = function() {
            	$ionicScrollDelegate.freezeScroll(true);
            	if(!!freezeScrollTimout) {
            		$timeout.cancel(freezeScrollTimout);
            		freezeScrollTimout = null;
            	}
            	freezeScrollTimout = $timeout(function() {
            		$ionicScrollDelegate.freezeScroll(false);
            	}, 1000);
            	
            };
            
			var dragFn = function (event) {
				
    			freezeScroll();
    			var scrollTop = $ionicScrollDelegate.$getByHandle(scope.delegateHandle).getScrollPosition().top;
				var modalOffsetTop = modal.offsetTop || 0;
				var modalOffsetLeft = modal.offsetLeft || 0;
				
				//reset mapWidth and mapHeight because screen could be resized on browser
                mapWidth = element[0].parentElement.clientWidth;
                mapHeight = element[0].parentElement.clientHeight - 6; // map : 2px margin-top, 2px margin-bottom | object: 1px of border-top, 1px of border-bottom
                
                function getLeft() {
	                var cursorX = event.gesture.center.pageX;
	                var offsetLeft = element[0].offsetLeft;
	                
	                if(cursorX > mapWidth - fixCursorX + modalOffsetLeft) {
	                	cursorX = mapWidth - fixCursorX + modalOffsetLeft;
	                } else if(cursorX < fixCursorX + modalOffsetLeft) {
	                	cursorX = fixCursorX + modalOffsetLeft;
	                }
	                
	                return cursorX - fixCursorX - modalOffsetLeft;
                }
                
                function getTop() {
                	var cursorY = event.gesture.center.pageY;
	                var offsetTop = element[0].parentElement.offsetTop;
	                if(cursorY > mapHeight + offsetTop - scrollTop + fixCursorY + modalOffsetTop) {
	                	cursorY = mapHeight + fixCursorY;
	                } else if(cursorY < offsetTop - scrollTop + fixCursorY*3 + modalOffsetTop) {
	                	cursorY = fixCursorY * 3;
	                } else {
	                	cursorY = cursorY - offsetTop + scrollTop - modalOffsetTop;
	                }
	                
	                return cursorY - fixCursorY * 3;
                }
                
                var left = getLeft();
                var top = getTop();
                
                element.css('left', left + "px");
                element.css('top', top + "px");
                
                scope.ngModel.x = (left + fixCursorX)/mapWidth;
				scope.ngModel.y = (top + fixCursorY)/mapHeight;
            };
            
            if(scope.canDrag) {
            	var dragGesture = $ionicGesture.on('drag', dragFn, element);
            }
		}
	};

});