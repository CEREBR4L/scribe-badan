var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	username: String, 
	password: String,
	email: String,  
	isAdmin: Boolean,
	isWriter: Boolean,
	isAuthor: Boolean,
	isScribe: Boolean,
	isDeleted:{
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('users', dbSchema);
