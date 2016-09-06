var stories = require('./models/stories.js')

exports.getStories = function(req, res){
	stories.find({}, function(err, items){
		res.json(items);
	});
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

		res.json(data);

	});
	
}

