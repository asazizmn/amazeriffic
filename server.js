// variables setup (as per recommended practise)
// and necessary module imports
var express = require('express'),
	http = require('http'),
	app = express(),

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

//
// set up routes to respond with requests
//

// handle get request from client requesting for todos json
app.get('/todos.json', function (req, res) {
	// note use of 'json' method, instead of 'send'
	res.json(todos);
});

// handle post request from client
app.post('/todo', function (req, res) {
	console.log('data has been posted to the server!');

	// send back a simple message
	res.json({ "message": "You posted to the server!" });
});


// create new instance of http server 
// that listens to port 3000
http.createServer(app).listen(3000);
console.log('Server running on port 3000');
