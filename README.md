# PriorityQueue
Priority Queue REST API 


Job Order Priority Queue 



Description of Endpoints:
route ('api/jobs')
    .get - gets list of all jobs 
    .put - dequeue show and remove highest priority job order 
    .delete - deletes all jobs

router.route('/jobs/:id')
    .get - gets single job given ID, returns priority ranking
    .put - enqueue job ID, include a time parameter in JSON Date format*
    .delete - deletes single job given ID

router.route('/pushRandomJob')
    .get - creates a random ID into the database at the time entered

router.route('/wait')
    .get - returns average wait in seconds





Priority Type Rules
(1) Normal IDs are given a rank equal to the number of seconds they’ve been in the queue.
(2) Priority IDs are given a rank equal to the result of applying the fol- lowing formula to the number of seconds they’ve been in the queue:
max(3, n log n)
(3) VIP IDs are given a rank equal to the result of applying the following
formula to the number of seconds they’ve been in the queue: max(4, 2n log n)
(4) Management Override IDs are always ranked ahead of all other IDs and are ranked among themselves according to the number of seconds they’ve been in the queue.

You can determine the type of the ID using the following method:
(1) IDs that are evenly divisible by 3 are priority IDs.
(2) IDs that are evenly divisible by 5 are VIP IDs.
(3) IDs that are evenly divisible by both 3 and 5 are management override
IDs.
(4) IDs that are not evenly divisible by 3 or 5 are normal IDs.


*JSON Date Format 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
?time="2016-02-11T11:06:06.296Z"


