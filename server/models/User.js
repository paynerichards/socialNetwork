var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	name: String,
	image: String,
	hometown: String,
	food: String,
	movie: String,
	music: String,
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', UserSchema)