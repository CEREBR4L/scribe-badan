var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	title: String,
	story: String,
	author: String,
	genre: String,
	rating: Number,
	positive: {
		type: Number,
		default: 0
	},
	negative: {
		type: Number,
		default: 0
	},
	views: {
		type: Number,
		default: 0
	},
	complete: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('stories', dbSchema);

