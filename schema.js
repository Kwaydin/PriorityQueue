var mongoose = require('mongoose');

var Job = new mongoose.Schema({
  time: String, 
  ID: Number, 
  type: String
});
