const ctrl = require('./receiver.controller');
const Config = require('./../../config');
const pin_receiver = Config.pin.receiver;
const pin_emitter = Config.pin.emitter;

try {

	const rpi433 = require('rpi-433');
	
	const rfSniffer = rpi433.sniffer({
		pin: pin_receiver,          //Snif on GPIO 2 (or Physical PIN 13) 
		debounceDelay: 500          //Wait 500ms before reading another code 
	});
	
	const rfEmitter = rpi433.emitter({
		pin: pin_emitter,           //Send through GPIO 0 (or Physical PIN 11) 
		pulseLength: 350            //Send the code with a 350 pulse length 
	});
	
	exports.emit = function(code, callback) {
		rfEmitter.sendCode(code, function(err, stdout) {
			if(!!err) {
				console.error(err);
				callback(err);
			} else {
				callback();
			}
		});
	};
	
	exports.listen = function() {
		rfSniffer.on('data', function (data) {
			ctrl.received(data.code);
			console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
		});
	};
	
} catch (err) {
	
	console.error(err);
	
	console.log("Simulating Emitter and Receiver !");
	
	exports.emit = function(code, callback) {
		receive(code);
		callback();
	};
	
	exports.listen = function() {}
	
	function receive(code) {
		console.log("received code: " + code);
		ctrl.received(code);
	}
	
}
