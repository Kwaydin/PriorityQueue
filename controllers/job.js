//author: Ryan McP

/*
  time: String, //JSON date
  ID: Number, //The IDs will be integers in the range of 1 to 9223372036854775807.
  type: Number //There are 4 classes of IDs, normal, priority, VIP, and management override.
*/
var Job = require('../models/job');


//(3) returns list of all jobs priority ranked
exports.getAll = function (req, res) {
    var now = new Date();
    //var now = (submittedDate === undefined) ? new Date() : submittedDate;
    
    
    Job.find({}, null, {sort: {date: 1}},(function (err, collection) {
        if (err) return console.error(err);
        
        
        collection.sort(function(a,b){
            return prioritySort(a,b,now);
        });

        res.json({ data: collection });
                
    }));
};


//(5) return rank
exports.getJob = function (req, res) {
    var id = req.params.id;
    var time = new Date(req.param('time'));
    var rank = -1;
    
    time = (time) ? new Date() : time; //Job if no time given use 'now'
    
    console.log('id '+req.params.id);
    console.log('time '+time);
    
    
    Job.find({}, null, {sort: {date: 1}},(function (err, collection) {
        if (err) return res.send(err);
        
        collection.sort(function(a,b){
            return prioritySort(a,b,time);
        });
        
        for(var i = 0; i < collection.length; i++)
        {
            if(collection[i].ID == id)
            {
                   rank=i;
            }
        }
        
        res.json({ message: 'job order: ', rank: rank, data: collection[rank]});
        
    }));
};


//(1) enqueue
exports.enqueue = function (req, res) {
    var id = req.params.id;
    var time = req.param('time');
    
    time = (time) ? new Date() : time; //Job is inserted 'now' if no time given
    
    console.log('id '+req.params.id);
    console.log('time '+req.param('time'));
    Job.find({ ID : id}, (function (err, collection){
        if (err) return res.send(err);
        
        if(!collection.length)
        {
            var job = new Job({type : analyzeID(id), ID : id, time : time, });
            job.save(function(err) {
                if (err)
                  res.send(err);

                res.json({ message: 'Successfully Added Job! ', data: job }); //Great Job!
            });
        }
        else res.json({message: 'ID already exists.'});
    }));
};


//(2) dequeue
exports.dequeue = function(req, res) {
    var now = new Date();
    
    Job.find({}, null, {sort: {date: 1}},(function (err, collection) {
        if (err) return res.send(err);
        
        collection.sort(function(a,b){
            return prioritySort(a,b,now);
        });
        
        for(var i = 0; i < collection.length; i++)
        {
            if(collection[i].ID == id)
            {
                   rank=i;
            }
        }
        
        res.json({ message: 'priority job request: ', ID: collection[0].id, time: collection[0].time, data: collection[0]});
        
    }));
};


//used for testing
exports.pushRandomJob = function (req, res) {
    
    // Create a new instance of the Job model
    var job = new Job();
    
    job.time = (new Date).toJSON();
    job.ID = String(Math.floor(Math.random() * 922337203) + 1);
    job.type = analyzeID(job.ID);

    // Save the job and check for errors
    job.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Great job! ', data: job });
    });
};


//delete all jobs from db
exports.deleteAll = function(req,res) {
    Job.remove({}, function(err,removed) {
        res.json({message : 'bye bye db'});
    });
    
};


//(4) remove Job using ID 
exports.deleteJob = function(req,res) {
    console.log('id '+req.params.id);
    console.log('time '+req.param('time'));
    Job.find({ ID : req.params.id }).remove( {}, function(err,removed) {});
    res.send("removing ID: " + req.params.id.toString());
};


//(6) average wait time
exports.averageWait = function(req,res) {
    var now = new Date();
    var sumDelta = 0;
    //var now = (submittedDate === undefined) ? new Date() : submittedDate;
    
    
    Job.find({}, null, {sort: {date: 1}},(function (err, collection) {
        if (err) return console.error(err);
        
        for(var i = 0; i < collection.length; i++)
        {
            sumDelta+= now - collection[i].time;
        }
        
        res.json({message : 'wait time', average: sumDelta/collection.length+1 });
    }));
    
};





//HELPER FUNCTIONS

var max = function(a,b){
  return (a>b) ? a : b;
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

var priorityTime = function(type, seconds){
    switch(type) {
        case 1:
            return  max(4, 2*seconds*Math.log(seconds));
            break;
        case 2:
            return  max(3, seconds*Math.log(seconds));
            break;
        default: 
            return seconds;
            break;
    }
}; 