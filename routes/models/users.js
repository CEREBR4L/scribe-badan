const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: String, 
	password: String,
	email: String,
	created: Date,
	stories: {
		type: Number,
		default: 0
	},  
	contributions: {
		type: Number,
		default: 0
	},
	comments: {
		type: Number,
		default: 0
	},
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

userSchema.pre('save', (next) => {

	let user = this;

	if(this.isModified('password') || this.isNew){

		bcrypt.genSalt(10, (err, salt) => {

			if(err){
				return next(err);
			}

			bcrypt.hash(user.password, salt, (err, hash) => {

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

userSchema.methods.checkPassword = (passw, cb) => {

	console.log("Passw: " + this.password);

	bcrypt.compare(passw, this.password, (err, isMatch) => {

		if(err){
			return cb(err);
		}

		console.log("isMatch: " + isMatch);

		cb(null, isMatch);

	});

}

module.exports = mongoose.model('users', userSchema);
