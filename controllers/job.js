var Job = require('../models/job');



/*
*GET
*/

exports.getAll = function (req, res) {
    
    Job.find(function (err, collection) {
    if (err) return console.error(err);
        res.send(""+JSON.stringify(collection));
    })
};

//(5) return rank
exports.getJob = function (req, res) {
    console.log(req.params.id);
    res.send(req.params.id);
};

/*

//(6) average wait time
app.get('/ids/stats', function (req, res) {})


//enqueue (1) 
//app.put('/ids/:id?time', function (req, res) {})

//dequeue (2)
app.put('/ids', function (req, res) {})

//delete all ids
app.delete('/ids', function (req, res) {}) 

//delete id
app.delete('/ids/:id', function (req, res) {}) //resort list







*/
