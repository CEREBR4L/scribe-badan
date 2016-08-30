var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	title: String,
	story: String
})

module.exports = mongoose.model('stories', dbSchema);

