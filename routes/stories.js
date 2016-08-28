var stories = require('./models/stories.js')

exports.getStories = function(req, res){
	stories.find({}, function(err, items){
		res.json(items);
	});
};
