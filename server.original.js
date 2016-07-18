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
// and server creation
app.use(express.static(__dirname + '/client'));
http.createServer(app).listen(3000);;

// set up route to respond with todos object
app.get('/todos.json', function (req, res) {
	// note use of 'json' method, instead of 'send'
	res.json(todos);
});


console.log("Server running on port 3000");
