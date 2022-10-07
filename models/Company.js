const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CompanySchema = new Schema({
  name:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  ceo:{
    type:String,
    required:true
  },
  vat:{
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

module.exports = Company = mongoose.model("Companies", CompanySchema);
