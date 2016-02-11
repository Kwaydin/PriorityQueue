var Job = require('../models/job');

/*
  time: String, //JSON date
  ID: Number, //The IDs will be integers in the range of 1 to 9223372036854775807.
  type: Number //There are 4 classes of IDs, normal, priority, VIP, and management override.
*/


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
    console.log('time '+req.param('time'));
    
    res.send(analyzeID(Number(req.params.id)));
};


exports.pushRandomJob = function (req, res) {
    
    // Create a new instance of the Beer model
    var job = new Job();
    
    job.time = req.body.name;
    job.ID = String(Math.floor(Math.random() * 922337203) + 1);
    job.type = analyzeID(job.ID);

    // Save the beer and check for errors
    job.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Great job! ', data: job });
    });
};




/*
 You can determine the class of the ID using the following method:


(0) IDs that are evenly divisible by both 3 and 5 are management override IDs.
(1) IDs that are evenly divisible by 5 are VIP IDs.
(2) IDs that are evenly divisible by 3 are priority IDs.
(3) IDs that are not evenly divisible by 3 or 5 are normal IDs.

*/
var analyzeID = function(id){
    var x = Number(id.substr(-2)); //only need last two digits of ID for divisability

    
    if(!(x%15)){ //class Management Override IDs, LCM(3,5)=15
        return 0;
    }else if(!(x%5)){
        return 1;
    }else if(!(x%3)){
        return 2;
    }else{
        return 3;   
    }   
};

var priorityRank = function(type, seconds){
    
    switch(type) {
    case 2:
        
        break;
    case 3:
        
        break;
    default:
        
} 
            
    
    
    if(!(id%15)){ //class Management Override IDs, LCM(3,5)=15
        return 0;
    }else if(!(id%5)){
        return 1;
    }else if(!(id%3)){
        return 2;
    }else{
        return 3;   
    }   
};

var determineRank = function(submittedDate){
    
    var now = (submittedDate === undefined) ? Date.now() : submittedDate;
    
    
    
    
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
