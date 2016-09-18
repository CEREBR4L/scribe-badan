var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	title: String,
	story: String,
	positive: {
		type: Number,
		default: 0
	},
	negitive: {
		type: Number,
		default: 0
	},
	views: {
		type: Number,
		default: 0
	}
})

module.exports = mongoose.model('stories', dbSchema);

