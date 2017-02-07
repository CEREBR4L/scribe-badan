const comments = require('./models/comments.js')

exports.comments = (req, res) => {

	comments.find({}, (err, comments) => {

		if(err){
			console.log("Erroring finding comments: " + err);
			res.json({ message: "Error while trying to retrive comments." });
		}

		res.json(comments);

	});

}

exports.getByID = (req, res) => {

	let parent = req.params.parent;

	comments.find({ parentID: parent }, (err, comments) => {

		if(err){
			console.log("Error getting comments for: " + parent );
			res.json({ message: "Error getting comments for: " + parent  });
		}

		res.json(comments);

	});

}


exports.new = (req, res) => {

	let parent = req.body.parent;
	let user = req.body.username;
	let comment = req.body.comment;

	let data = 	new stories({
		parentID: parent,
		username: user, 
		comment: comment,
		created: new Date().getTime()
	})

	data.save((err, data) => {
		if(err){
			console.log("There was an ERROR: " + err);
			res.json({ message: "Error creating comment" });
		}

		console.log("Comment saved: " + data.user + " // " + data.comment);
		
		res.json(data);

	});
	
}

exports.delete = (req, res) => {

	let comment = req.body.commentID;

	comments.remove({ _id: comment }, (err) => {

		if(err){
			console.log("Error deleting comment: " + comment);
			res.json({ message: "There was an issue deleting this comment" });
		}

		res.json({ message: "Comment deleted" });

	});

}
