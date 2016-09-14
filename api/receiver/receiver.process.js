const rpi433 = require('rpi-433');
const ctrl = require('./receiver.controller');
const Config = require('./../../config');
const pin_receiver = Config.pin.receiver;
const pin_emitter = Config.pin.emitter;

const rfSniffer = rpi433.sniffer({
	pin: pin_receiver,          //Snif on GPIO 2 (or Physical PIN 13) 
	debounceDelay: 500          //Wait 500ms before reading another code 
});

const rfEmitter = rpi433.emitter({
	pin: pin_emitter,           //Send through GPIO 0 (or Physical PIN 11) 
	pulseLength: 350            //Send the code with a 350 pulse length 
});

exports.emit = function(code, callback) {
	console.log(code);
	rfEmitter.sendCode(code, function(err, stdout) {
		if(!!err) {
			console.error(err);
			callback(err);
		} else {
			console.log(stdout);
		}
	});
};

exports.listen = function() {
	rfSniffer.on('data', function (data) {
		console.log(data);
		console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
	});
};