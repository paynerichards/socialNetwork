var express = require('express'),
	router = express.Router(),
	Post = require('../models/Post'),
	User = require('../models/User'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(request, response){
	var text = request.body.text;
	var post = new Post({text: text});
	post.save();
	var userId = request.body.userId
	User.findById(userId, function(error, user){
		user.posts.push(post.id);
		user.save();
		response.redirect(request.get('referer'))
	})
})


module.exports = router