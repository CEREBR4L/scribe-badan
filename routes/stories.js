const stories = require('./models/stories.js')

exports.getStories = (req, res) => {
	stories.find({}).sort({rating: -1}).exec((err, items) => {
		res.json(items);
	});
};

exports.getStoryById = (req, res) => {

	let id = req.params.id;

	stories.findOne({_id: id}, (err, story) => {

		if(err){
			console.log("Error getting story by ID: " + err );
			return;
		}

		res.json(story);

	});

}

exports.getRandom = (req, res) => {

	stories.count({complete: false}).exec((err, count) => {
		
		if(err){

			console.log('Error counting while trying to get a random story: ' + err);
			return;
			
		}

		var number = Math.floor(Math.random() * count);

		stories.findOne({complete: false}).skip(number).exec((err, story) => {

			if(err){

				console.log('Error geting a random story: ' + err);
				return;

			}

			res.json(story);

		})

	})
};


exports.add = (req, res) => {

	let title = req.body.title;
	let story = req.body.story;	
	let author = req.body.author;
	let genre = req.body.genre;

	const data = 	new stories({
		title: title,
		story: story,
		author: author,
		genre: genre,
		created: new Date().getTime(),
		updated: new Date().getTime()
	})

	data.save((err, data) => {
		if(err){
			console.log("There was an ERROR: " + err);
			return;
		}

		console.log("Story created: " + data.title);
		
		res.json(data);

	});
	
}

exports.updateStory = (req, res) => {

	let id = req.params.id;

	stories.findOne({_id: id}, (err, item) => {

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
		item.updated = new Date;

		item.save((err) => {

			if(err){
				console.log("Error saving item while trying to update: " + err);
				return;
			}

			console.log("Story updated: " + id + " // " + item.title);

			res.send("Update complete for: " + id + " // " + item.title);

		});

	});

}

exports.addPositive = (req, res) => {

	let id = req.params.id; 

	stories.findOne({_id: id}, (err, item) => {

		if(err){
			console.log("Error adding upvote: " + err);
			return;
		}

		item.positive = item.positive + 1;

		item.rating = findRating(item.positive, item.negative, item.views, item.updated);

		item.save((err, data) => {

			if(err){
				console.log("Error saving upvote: " + err);
				return;
			}

			console.log("Upvote added to: " + id + " // " + item.title );

			res.json(data);

		});

	});

}

exports.addNegative = (req, res) => {

	let id = req.params.id; 

	stories.findOne({_id: id}, (err, item) => {

		if(err){
			console.log("Error adding Downvote: " + err);
			return;
		}

		item.negative = item.negative + 1;

		item.rating = findRating(item.positive, item.negative, item.views, item.updated);

		item.save((err, data) => {

			if(err){
				console.log("Error saving upvote: " + err);
				return;
			}

			console.log("Downvote added to: " + id + " // " + item.title );

			res.json(data);

		});

	});

}


exports.addView = (req, res) => {

	let id = req.params.id; 

	stories.findOne({_id: id}, (err, item) => {

		if(err){
			console.log("Error adding view: " + err);
			return;
		}

		item.views = item.views + 1;

		item.rating = findRating(item.positive, item.negative, item.views, item.updated);

		item.save((err, data) => {

			if(err){
				console.log("Error saving view: " + err);
				return;
			}

			console.log("View added to: " + id + " // " + item.title );

			res.json(data);

		});

	});

}

exports.markComplete = (req, res) => {

	let id = req.params.id;

	stories.findOne({_id: id}, (err, story) => {

		if(err){
			console.log("Error marking complete: " + err);
			return;
		}

		story.complete = true; 

		story.save((err, item) => {

			if(err){
				console.log("Error saving when marking story complete: " + err);
				return;
			}

			res.json(data);

		})

	})

}

function findRating(upvotes, downvotes, views, lastUpdate){

	upvotes *= 2.75;
	downvotes *= 2.75;
	
	if(lastUpdate){

		let update = Math.round( ( new Date().getTime() - lastUpdate.getTime() ) / 1000 / 60 / 60 / 24 ) * 3.5;
		return ( upvotes + views ) - ( downvotes + update );

	}else{

		return ( upvotes + views ) - downvotes;
		
	}

}

