var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
	parentID: String,
	user: String, 
	comment: String,
	upvotes: Number,
	downvotes: Number,
	isDeleted: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('comments', commentsSchema);
