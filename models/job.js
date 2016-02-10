var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
  time: String, 
  ID: Number, 
  type: String
});

// Export the model as a collection
module.exports = mongoose.model('Job', JobSchema);