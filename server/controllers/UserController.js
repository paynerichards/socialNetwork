var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));


// GET request to users/register
router.get('/register', function(request, response){
	response.render('register')
})
// GET request to users/login
router.get('/login', function(request, response){
	response.render('login')
})


router.post('/login', function(request, response){
	User.findOne({email: request.body.email}, function(err,user){
		if(user){
			bcrypt.compare(request.body.password, user.password, function(error, match){
				if (match === true){
					request.session.loggedIn = true;
					response.redirect('http://localhost:3000/users/' + user.id);
				}else{
					response.redirect('http://localhost:3000/users/login');
				}
			})
		}else{
			response.redirect('http://localhost:3000/users/register');
		}
	})
})

router.get('/logout', function(request, response){
  request.session.loggedIn = false;
  response.redirect('/users/login');
});

//////////////////////////
//////////api/////////////
//////////////////////////


//GET request to /users
router.get('/', function(request, response){
	User.find(function(error, users){
		response.json(users)
	})
})

router.get('/:id', function(request, response){
	var id = request.params.id;
	User.findById(id).populate('posts').exec(function(error, user){
		response.render('profile', user)
	})
})

//POST request to /users/register
router.post('/', function(request, response){
	bcrypt.hash(request.body.password, 10, function(error, hash){
		console.log(request.body)
		var user = new User({
				email: request.body.email,
				password: hash,
				name: request.body.name,
				image: request.body.image,
				hometown: request.body.hometown,
				food: request.body.food,
				movie: request.body.movie,
				music: request.body.music
			})	
		user.save();
		var id = user.id
				console.log(user)
		request.session.loggedIn = true;
		response.redirect('users/' + id)

	})
	
})

//DELETE request to /users
router.delete('/:id', function(request, response){
	var id = request.params.id;
	User.findById(id, function(error, user){
		user.remove();
		response.json('success')
	})
})



module.exports = router;