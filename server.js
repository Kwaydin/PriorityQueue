var express = require('express')
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://0.0.0.0/my_database');

var app = express()
 
var mySchema = new mongoose.Schema({
  time: { type: String }
, selector: Number
, type: String
});

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var myCollection  = mongoose.model('MyTests2', mySchema);

now = new Date().toJSON();

var thor = new myCollection({
  time: now
, selector: '1234'
, type: 'special'
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});

app.get('/', function (req, res) {

now = new Date().toJSON();

  var thor = new myCollection({
  time: now
, selector: '4321'
, type: 'special_Z'
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir('worked');
});

  res.send('Hello World'+thor)
})
 
app.listen(3030)
