var express = require('express')
var mongoose = require('mongoose');
var jobController = require('./controllers/job');
 
mongoose.connect('mongodb://0.0.0.0/my_database');

var app = express()
 
var router = express.router()


router.route('/jobs')
    .get(jobController.getAll)
//    .delete(jobController.deleteAll)

router.route('/jobs/:id')
    .get(jobController.getJob)
/*    .put(jobController.enqueue)
    .delete(jobController.deleteJob)

router.route('/dequeue')
    .get(jobController.dequeue)



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


*/
app.listen(3030)
