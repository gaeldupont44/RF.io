var process = require('./speech.process');

exports.process = function(req, res) {
	process.full(req.params.speech, function(err) {
		if(!!err) {
			return res({error: err}).code(500);
		}
		return res().code(204);
	});
		
};