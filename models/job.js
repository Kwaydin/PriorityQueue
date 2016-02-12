//author: Ryan McP
var mongoose = require('mongoose');


var JobSchema = new mongoose.Schema({
  time: Date, //JSON date
  ID: String, //The IDs will be integers in the range of 1 to 9223372036854775807.
  type: Number //There are 4 classes of IDs, normal, priority, VIP, and management override.
});

// Export the model as a collection
module.exports = mongoose.model('Job', JobSchema);