var comments = require('./models/comments.js')

exports.comments = function(req, res){

	comments.find({}, function(err, comments){

		if(err){
			console.log("Erroring finding comments: " + err);
			res.json({ message: "Error while trying to retrive comments." });
		}

		res.json({comments});

	});

}

