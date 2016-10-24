var stories = require('./models/stories.js')

exports.getStories = function(req, res){
	stories.find({}).sort({_id: -1}).exec(function(err, items){
		res.json(items);
	});
};

exports.getStoryById = function(req, res){

	var id = req.params.id;

	stories.findOne({_id: id}, function(err, story){

		if(err){
			console.log("Error getting story by ID: " + err );
			return;
		}

		res.json(story);

	});

}

exports.getRandom = function(req, res){
	stories.count({complete: false}).exec(function(err, count){
		
		if(err){

			console.log('Error counting while trying to get a random story: ' + err);
			return;
			
		}

		var number = Math.floor(Math.random() * count);

		stories.findOne({complete: false}).skip(number).exec(function(err, story){

			if(err){

				console.log('Error geting a random story: ' + err);
				return;

			}

			res.json(story);

		})

	})
};


exports.add = function(req, res){

	var title = req.body.title;
	var story = req.body.story;	
	var author = req.body.author;
	var genre = req.body.genre;

	var data = 	new stories({
		title: title,
		story: story,
		author: author,
		genre: genre
	})

	data.save(function(err, data){
		if(err){
			console.log("There was an ERROR: " + err);
			return;
		}

		console.log("Story created: " + data.title);
		
		res.json(data);

	});
	
}

exports.updateStory = function(req, res){

	var id = req.params.id;

	stories.findOne({_id: id}, function(err, item){

		if(err){
			console.log("Error finding item while trying to update: " + err);
			return;
		}

		if(item.story === undefined){
			item.story = req.body.story;
		}
		else{
			item.story = item.story + '\n\n' + req.body.story;
		}

		item.complete = req.body.complete;

		item.save(function(err){

			if(err){
				console.log("Error saving item while trying to update: " + err);
				return;
			}

			console.log("Story updated: " + id + " // " + item.title);

			res.send("Update complete for: " + id + " // " + item.title);

		});

	});

}

exports.addPositive = function(req, res){

	var id = req.params.id; 

	stories.findOne({_id: id}, function(err, item){

		if(err){
			console.log("Error adding upvote: " + err);
			return;
		}

		item.positive = item.positive + 1;

		item.rating = findRating(item.positive, item.negative, item.views);

		item.save(function(err, data){

			if(err){
				console.log("Error saving upvote: " + err);
				return;
			}

			console.log("Upvote added to: " + id + " // " + item.title );

			res.json(data);

		});

	});

}

exports.addNegative = function(req, res){

	var id = req.params.id; 

	stories.findOne({_id: id}, function(err, item){

		if(err){
			console.log("Error adding Downvote: " + err);
			return;
		}

		item.negative = item.negative + 1;

		item.rating = findRating(item.positive, item.negative, item.views);

		item.save(function(err, data){

			if(err){
				console.log("Error saving upvote: " + err);
				return;
			}

			console.log("Downvote added to: " + id + " // " + item.title );

			res.json(data);

		});

	});

}


exports.addView = function(req, res){

	var id = req.params.id; 

	stories.findOne({_id: id}, function(err, item){

		if(err){
			console.log("Error adding view: " + err);
			return;
		}

		item.views = item.views + 1;

		item.rating = findRating(item.positive, item.negative, item.views);

		item.save(function(err, data){

			if(err){
				console.log("Error saving view: " + err);
				return;
			}

			console.log("View added to: " + id + " // " + item.title );

			res.json(data);

		});

	});

}

exports.markComplete = function(req, res){

	var id = req.params.id;

	stories.findOne({_id: id}, function(err, story){

		if(err){
			console.log("Error marking complete: " + err);
			return;
		}

		story.complete = true; 

		story.save(function(err, item){

			if(err){
				console.log("Error saving when marking story complete: " + err);
				return;
			}

			res.json(data);

		})

	})

}

function findRating(upvotes, downvotes, views){

	upvotes *= 2.75;
	downvotes *= 2.75;

	return upvotes + views - downvotes;

}

