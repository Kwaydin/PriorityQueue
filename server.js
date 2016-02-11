var express = require('express')
var mongoose = require('mongoose');

var jobController = require('./controllers/job');

 
mongoose.connect('mongodb://0.0.0.0/my_database');

var app = express()
 

var router = express.Router();

// Register all our routes with /api
app.use('/api', router);



router.route('/jobs')
    .get(jobController.getAll)
//    .delete(jobController.deleteAll)

router.route('/jobs/:id')
    .get(jobController.getJob)
/*    .put(jobController.enqueue)
    .delete(jobController.deleteJob)
*/


router.route('/pushRandomJob')
    .get(jobController.pushRandomJob)

/*
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

*/


app.listen(3030)
