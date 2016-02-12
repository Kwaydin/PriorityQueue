var express = require('express')
var mongoose = require('mongoose');

var jobController = require('./controllers/job');

 
mongoose.connect('mongodb://0.0.0.0/my_database');

var app = express()
 

var router = express.Router();

// Register all routes with /api
app.use('/api', router);



router.route('/jobs')
    .get(jobController.getAll)
    .delete(jobController.deleteAll)
    .put(jobController.dequeue)

router.route('/jobs/:id')
    .get(jobController.getJob)
    .delete(jobController.deleteJob)
    .put(jobController.enqueue)

router.route('/pushRandomJob')
    .get(jobController.pushRandomJob)



app.listen(3030)
