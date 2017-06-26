var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	fs = require('fs'),
	path = require('path'),

	require("./db/db")

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');




app.get('/', function(req, res){
	res.render('home')
})

app.get('/explore', function(req, res){
	res.render('explore')
})

app.get('/community', function(req, res){
	res.render('community')
})

app.get('/profile', function(req, res){
	var index = req.query.id
	var person = people[index]
	res.render('profile', person)
})

app.get('/channel', function(req, res){
	var index = req.query.id
	var channel = channels[index]
	res.render('channel', channel)
})

server.listen(3000, function(){
	console.log('port 3000')
})