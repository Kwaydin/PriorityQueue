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
    console.log('id '+req.params.id);
    console.log('time '+req.param.time);
    
    res.send(analyzeID(req.params.id));
};



/*
 You can determine the class of the ID using the following method:

(0) IDs that are evenly divisible by both 3 and 5 are management override IDs.
(1) IDs that are evenly divisible by 5 are VIP IDs.
(2) IDs that are evenly divisible by 3 are priority IDs.
(3) IDs that are not evenly divisible by 3 or 5 are normal IDs.

*/
var analyzeID = function(id){
    if(!(id%15)){ //type 4, LCM(3,5)=15
        return 0;
    }else if(!(id%5)){
        return 1;
    }else if(!(id%3)){
        return 2;
    }else{
        return 3;   
    }   
};



/*

//(6) average wait time
app.get('/ids/stats', function (req, res) {})


//enqueue (1) 
The service should reject work orders with IDs that already exist in the
queue (I.E. the same user cannot have more than one work order in the
queue).
//app.put('/ids/:id?time', function (req, res) {})

//dequeue (2)
app.put('/ids', function (req, res) {})

//delete all ids
app.delete('/ids', function (req, res) {}) 

//delete id
app.delete('/ids/:id', function (req, res) {}) //resort list







*/
