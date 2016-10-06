// variables setup (as per recommended practice)
// and necessary module imports
var express = require('express'),
	app = express(),
	http = require('http'),
	mongoose = require('mongoose'),
	
	// required to allow for automatic conversion of json to js objects
	bodyParser = require('body-parser'),

	Todo = require('./models/Todo'),


	// this will allow object persistence 
	// as apposed to when just using todos.json
	todos = [
		{
			"description": "Get groceries",
			"tags": ["shopping", "chores"]
		},
		{
			"description": "Make up some new ToDos",
			"tags": ["writing", "work"]
		},
		{
			"description": "Prep for Monday's class",
			"tags": ["work", "teaching"]
		},
		{
			"description": "Answer emails",
			"tags": ["work"]
		},
		{
			"description": "Take Gracie to the park",
			"tags": ["chores", "pets"]
		},
		{
			"description": "Finish writing this book",
			"tags": ["writing", "work"]
		}
	];


// set up static file directory to allow direct resrc serving
app.use(express.static(__dirname + '/client'));

// make express parse all incoming JSON objects
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/amazeriffic');


//
// set up routes to respond with requests
//

// handle get request from client requesting for todos json
app.get('/todos.json', function (req, res) {

	// but find the todos from the database and return them instead
	Todo.find({}, function (err, todos) {
		if (err) console.log(err);
		res.json(todos);
	});
});

// handle post request from client
app.post('/todo', function (req, res) {

	// create new todo object using mongoose based model
	var todo = new Todo({
		description: req.body.description,
		tags: req.body.tags
	});

	// show todo in the view
	todos.push(todo);

	todo.save(function (err, result) {
		
		// unsuccessful save
		if ( err ) {
			console.log(err);
			res.send('ERROR');

		// successful save
		} else {
			
			// return ALL the todos to match old client
			Todo.find({}, function (err, result) {
				if (err) res.send("ERROR");
				res.json(result);
			})
		}
	})

	// also save it in the database
	

	// send back a simple message
	res.json({ "message": "You posted to the server!" });
});


// create new instance of http server 
// that listens to port 3000
http.createServer(app).listen(3000);
console.log('Server running on port 3000');
