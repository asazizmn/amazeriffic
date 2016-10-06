var mongoose = require('mongoose');


var TodoSchema = new mongoose.Schema({
    description: String,
    tags: [String]
});

module.exports = mongoose.model('Todo', TodoSchema);