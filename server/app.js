var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	session = require('express-session');

	require('./db/db')

app.use(session({
	secret: "Nothing i type here even matters",
	resave: false,
	saveUnititialized: true,
	cookie: {secure: false}
}));

var UserController = require('./controllers/UserController');
var PostController = require('./controllers/PostController');

app.use('/users', UserController)
app.use('/posts', PostController)

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(request, response){
	response.render('home')
})

server.listen(3000, function(){
	console.log('port 3000')
})

