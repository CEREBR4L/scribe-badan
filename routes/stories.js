var stories = require('./models/stories.js')

exports.getStories = function(req, res){
	stories.find({}, function(err, items){
		res.json(items);
	});
};


exports.getRandom = function(req, res){
	stories.count().exec(function(err, count){
		
		if(err){

			console.log('Error counting while trying to get a random story: ' + err);
			return;
			
		}

		var number = Math.floor(Math.random() * count);

		stories.findOne().skip(number).exec(function(err, story){

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

	var data = 	new stories({
		title: title,
		story: story
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

		item.story = req.body.story;

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
