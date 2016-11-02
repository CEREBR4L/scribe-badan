var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var env = require('node-env-file');

//env(__dirname + '../.env');

var users = require('./models/users.js')


exports.authenticate = function(req, res){

	users.findOne({ name: req.body.name }, function(err, user){

		if(err){ 
			console.log("Erroring finding user while trying to autheticate: " + err); 
		}

		if(!user){
			
			res.json({ authenticated: false, message: "Failed to find requested user" });

		}
		else if(user){

			if(users.password != req.body.password){

				res.json({ authenticated: false, message: "Password incorrect" });

			}
			else{

				var token = jwt.sign({ name: users.username }, process.env.SALT, {});

				res.json({
					authenticated: true,
					message: "Token granted, you may pass.",
					token: token
				});

			}

		}

	});

}

exports.verify = function(req, res, next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token){

		jwt.verify(token, process.env.SALT, function(err, decoded){

			if(err){ 

				return res.json({ 
					authenticated: false, 
					message: "Invalid token, please try again." 
				});

			}
			else{

				req.decoded = decoded;
				next();

			}

		});

	}
	else{

		return res.status(403).send({
			authenticated: false,
			message: "No token, please provide one."
		});

	}

}


exports.findUser = function(req, res){

	console.log(req.decoded);

	users.findOne({ username: req.decoded.username }, function(err, user){

		if(err){ 
			console.log("Erroring finding user after authetication: " + err);
			res.json({ message: "Error while trying to find user." });
		}

		res.json(user);

	});

}

