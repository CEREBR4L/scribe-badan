var mongoose = require('mongoose');
var shortid = require('shortid');

var dbSchema = new mongoose.Schema({
	_id: {
		type: String,
		'default': shortid.generate
	},
	title: String,
	story: String
})

module.exports = mongoose.model('stories', dbSchema);

