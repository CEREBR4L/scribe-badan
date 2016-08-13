var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc = require('mongoose-auto-increment');
var shortid = require('shortid');

/* Live config */
//var connect = mongoose.connect('mongodb://127.0.0.1:27017/scribe');

/* Test config */
var connect = mongoose.connect('mongodb://localhost:27018/scribe');

autoInc.initialize(connect);

var dbSchema = new Schema({
	_id: {
		type: String,
		'default': shortid.generate
	},
	storyNumber: Number,
	story: String
})


dbSchema.plugin(autoInc.plugin, {model: 'stories', field: 'storyNumber'});
var stories = connect.model('stories', dbSchema);

exports.getStories = function(req, res){
	stories.find({}, function(err, items){
		res.json(items);
	});
};
