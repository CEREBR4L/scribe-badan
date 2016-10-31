var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	username: String, 
	password: String,
	email: String,  
	isAdmin: Boolean,
	isWriter: Boolean,
	isAuthor: Boolean,
	isScribe: Boolean,
	isActive: Boolean
})

module.exports = mongoose.model('users', dbSchema);
