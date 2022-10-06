const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SeekerSchema = new Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
});

module.exports = Seeker = mongoose.model("Seekers", SeekerSchema);
