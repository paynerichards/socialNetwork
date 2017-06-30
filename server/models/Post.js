var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	text: String,
	date: String,
	author: String
})

module.exports = mongoose.model('Post', PostSchema)