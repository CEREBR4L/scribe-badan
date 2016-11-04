var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	username: String, 
	password: String,
	email: String,  
	isAdmin: {
		type: Boolean,
		default: false
	},
	isWriter: {
		type: Boolean,
		default: false
	},
	isAuthor: {
		type: Boolean,
		default: false
	},
	isScribe: {
		type: Boolean,
		default: false
	},
	isDeleted:{
		type: Boolean,
		default: false
	}
})

userSchema.pre('save', function(next){

	var user = this;

	if(this.isModified('password') || this.isNew){

		bcrypt.genSalt(10, function(err, salt){

			if(err){
				return next(err);
			}

			bcrypt.hash(user.password, salt, function(err, hash){

				if(err){
					return next(err);
				}

				user.password = hash;
				next();

			});

		});

	}
	else{

		return next();
	
	}

});

userSchema.methods.checkPassword = function(passw, cb){

	bcrypt.compare(passw, this.password, function(err, isMatch){

		if(err){
			return cb(err);
		}

		cb(null, isMatch);

	});

}

module.exports = mongoose.model('users', userSchema);
