const _ = require("lodash");
const receiverCtrl = require('./receiver.controller');
const bridgeCtrl = require('../bridge/bridge.controller');
const Config = require('./../../config');
const noop = require('node-noop').noop;
const pin_receiver = Config.pin.receiver;
const pin_emitter = Config.pin.emitter;
const debounceDelay = Config.time.debounceDelay;
const pulseLength = Config.time.pulseLength;
var _emits = [];

try {

	const rpi433 = require('rpi-433');
	
	const rfSniffer = rpi433.sniffer({
		pin: pin_receiver,				//Snif on GPIO 2 (or Physical PIN 13) 
		debounceDelay: debounceDelay	//Wait before reading another code 
	});
	
	const rfEmitter = rpi433.emitter({
		pin: pin_emitter,			//Send through GPIO 0 (or Physical PIN 11) 
		pulseLength: pulseLength	//Send the code with a pulse length specific
	});
	
	exports.emit = function(code, callback) {
		callback = callback || noop;
		rfEmitter.sendCode(code, function(err, stdout) {
			if(!!err) {
				console.error(err);
				callback(err);
			} else {
				_.remove(_emits, function(code_emitter) { return code_emitter === code });
				callback();
			}
		});
	};
	
	exports.listen = function() {
		rfSniffer.on('data', function (data) {
			receiverCtrl.received(data.code);
			bridgeCtrl.getEmitterByCodeReceiver(data.code, function(codes_emitter) {
				_emits = _.union(_emits, codes_emitter);
				if(_emits.length > 0) {
					setTimeout(function() {
						exports.emit(_emits[0]);
					}, debounceDelay + pulseLength);
				}
			});
			
			console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
		});
	};
	
} catch (err) {
	
	console.error(err);
	
	console.log("Simulating Emitter and Receiver !");
	
	exports.emit = function(code, callback) {
		callback = callback || noop;
		_.remove(_emits, function(code_emitter) { return code_emitter === code });
		receive(code);
		callback();
	};
	
	exports.listen = noop;
	
	function receive(code) {
		console.log("received code: " + code);
		receiverCtrl.received(code);
		bridgeCtrl.getEmitterByCodeReceiver(code, function(codes_emitter) {
			_emits = _.union(_emits, codes_emitter);
			if(_emits.length > 0) {
				setTimeout(function() {
					exports.emit(_emits[0]);
				}, debounceDelay + pulseLength);
			}
		});
	}
	
}
