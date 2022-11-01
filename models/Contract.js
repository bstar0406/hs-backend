const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContractSchema = new Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies"
  },
  seekerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seekers"
  },
  companyRating:{
    type:Number,
    required:false,
    default:-1
  },
  companyReview:{
    type:String,
    required:false
  },
  seekerRating:{
    type:Number,
    required:false,
    default:-1
  },
  seekerReview:{
    type:String,
    required:false
  },
  startWorkDate:{
    type:String,
    required:false
  },
  duty:{
    type:String,
    required:false
  },
  paymentTerms:{
    type:String,
    required:false
  },
  currency:{
    type:String,
    required:false
  },
  amount:{
    type:String,
    required:false
  },
  hours:{
    type:String,
    required:false
  },
  benefit:{
    type:String,
    required:false
  },
  daysOfWeek:{
    type:String,
    required:false
  },
  breakMinutes:{
    type:String,
    required:false
  },
  hoursInWeek:{
    type:String,
    required:false
  },
  workingCity:{
    type:String,
    required:false
  },
  startDate:{
    type:String,
    required:false
  },
  endDate:{
    type:String,
    required:false
  },
  terminaton:{
    type:String,
    required:false
  },
  governingLaw:{
    type:String,
    required:false
  },
  dispute:{
    type:String,
    required:false
  },
  disputeCountry:{
    type:String,
    required:false
  },
  lawCountry:{
    type:String,
    required:false
  },
  description:{
    type:String,
    required:false
  },
  published:{
    type:String,
    required:false
  },
},
{
  timestamps: true
});

module.exports = Contract = mongoose.model("Contracts", ContractSchema);
