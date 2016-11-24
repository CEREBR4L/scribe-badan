var comments = require('./models/comments.js')

exports.comments = function(req, res){

	comments.find({}, function(err, comments){

		if(err){
			console.log("Erroring finding comments: " + err);
			res.json({ message: "Error while trying to retrive comments." });
		}

		res.json(comments);

	});

}

exports.getByID = function(req, res){

	var parent = req.params.parent;

	comments.find({ parentID: parent }, function(err, comments){

		if(err){
			console.log("Error getting comments for: " + parent );
			res.json({ message: "Error getting comments for: " + parent  });
		}

		res.json(comments);

	});

}


exports.new = function(req, res){

	var parent = req.body.parent;
	var user = req.body.username;
	var comment = req.body.comment;

	var data = 	new stories({
		parentID: parent,
		username: user, 
		comment: comment,
	})

	data.save(function(err, data){
		if(err){
			console.log("There was an ERROR: " + err);
			res.json({ message: "Error creating comment" });
		}

		console.log("Comment saved: " + data.user + " // " + data.comment);
		
		res.json(data);

	});
	
}
