var express = require('express')
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://0.0.0.0/my_database');

var app = express()
 
var mySchema = new mongoose.Schema({
  time: String, 
  ID: Number, 
  type: String
});



var myCollection  = mongoose.model('MyTests2', mySchema);

/*
*GET
*/

app.get('/', function (req, res) {

  now = new Date().toJSON();

  var thor = new myCollection({
    time: now, 
    ID: '4321',
    type: 'special_Z'
   });

  thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir('worked');
  });

  res.send('Hello World'+thor)
})

app.get('/ids', function (req, res) {
    res.send('Hello World '+myCollection.find());
    
    myCollection.find(function (err, collection) {
    if (err) return console.error(err);
        res.send(""+JSON.stringify(collection));
    })
})

//(5) return rank
app.get('/ids/:id', function (req, res) {
    console.log(req.params.id);
    res.send(req.params.id);
})

//(6) average wait time
app.get('/ids/stats', function (req, res) {})


/*
*POST
*/

//enqueue (1) 
//app.put('/ids/:id?time', function (req, res) {})

//dequeue (2)
app.put('/ids', function (req, res) {})

/*
*POST
*/

//delete all ids
app.delete('/ids/:id', function (req, res) {}) 

//delete id
app.delete('/ids/:id', function (req, res) {}) //resort list






















 
app.listen(3030)
