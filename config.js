'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8888,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL +
          process.env.OPENSHIFT_APP_NAME ||
          'mongodb://localhost/RF-io'
  },
  
  // GPIO pin
  pin: {
  	emitter: process.env.PIN_EMITTER || 3,
	receiver:  process.env.PIN_RECEIVER || 2
  },
  
  // Receive and emit time (in ms)
  time: {
  	debounceDelay: process.env.DEBOUNCE_DELAY || 400,
  	pulseLength: process.env.PULSE_LENGTH || 350
  }
  
};
