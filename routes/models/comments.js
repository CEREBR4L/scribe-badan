var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
	parentID: String,
	username: String, 
	comment: String,
	upvotes: Number,
	downvotes: Number,
	created: Date, 
	isDeleted: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('comments', commentsSchema);
