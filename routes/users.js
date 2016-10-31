var users = require('./models/users.js')

exports.users = function(req, res){
	users.find({}, function(err, items){
		res.json(items);
	});
};


