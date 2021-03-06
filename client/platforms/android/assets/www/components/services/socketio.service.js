/* global io */
'use strict';

angular.module('RFio')
.factory('SocketioService', function(socketFactory, $rootScope) {
    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket;
    var socket;
    
    function connect() {
    	ioSocket = io(((!!API.Host && API.Host.length > 0 ) ? API.Host + ((!!API.Port && API.Port.toString().length > 0) ? ":" + API.Port : "") : ""), {
	      path: '/socket.io-client'
	    });
	    
	    socket = socketFactory({ ioSocket:ioSocket });
	    
	    socket.on("connected", function() {
    		$rootScope.$broadcast("SOCKETIO-CONNECTED");
    		$rootScope.socketioConnected = true;
    	});
    }
    
    
    return {
      connect: connect,
      socket: socket,

	  /**
       * Register listeners to sync an object with updates on a model
       *
       * Takes the object we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new object are updated.
       *
       * @param {String} modelName
       * @param {Object} object
       * @param {Function} cb
       */
      syncOneUpdates(modelName, obj, cb) {
        cb = cb || angular.noop;
        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + '-' + obj._id + ':save', function (item) {
          var event = 'updated';
          _.extend(obj, item);
          cb(event, obj);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + '-' + obj._id + ':remove', function (item) {
          var event = 'deleted';
          obj = item;
          cb(event, obj);
        });
        
      },
      
      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates(modelName, array, cb) {
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
        
      },
      
	  /**
       * Removes listeners for a object model updates on the socket
       *
       * @param modelName
       */
      unsyncOneUpdates(modelName, obj) {
        socket.removeAllListeners(modelName + '-' + obj._id + ':save');
        socket.removeAllListeners(modelName + '-' + obj._id + ':remove');
      },
      
      /**
       * Removes listeners for an array model updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates(modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  });
