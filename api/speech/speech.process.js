const SpeechDictionnary = require('./speech.dictionnary');
const receiverCtrl = require('../receiver/receiver.controller');
const receiverProcess = require('../receiver/receiver.process');
exports.full = full;
exports.exec = exec;

function full(speech, callback) {
	var speechDictonnary = new SpeechDictionnary(speech);
	var executor = speechDictonnary.getExecutor();
	if(!!executor) {
		exec(speech, executor, callback);
	} else {
		callback(new Error("No Executor found"));
	}
}

function exec(speech, executor, callback) {
	var speechDictonnary = new SpeechDictionnary(speech);
	receiverCtrl.getAll(function(err, receivers) {
		if(!!err) {
			callback(err);
			return;
		}
		for(var receiverIdx = 0, receiversLen = receivers.length ; receiverIdx < receiversLen ; receiverIdx++) {
			if(speechDictonnary.find(receivers[receiverIdx].name)) {
				switch(executor) {
					case "Start": receiverProcess.emit(receivers[receiverIdx].code_on, callback); return;
					case "Stop": receiverProcess.emit(receivers[receiverIdx].code_off, callback); return;
				}
			}
		}
		callback(null);
		return;
	});
}