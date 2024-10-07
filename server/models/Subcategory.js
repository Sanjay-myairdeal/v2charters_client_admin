// const mongoose = require("mongoose");
// const SubcategorySchema = mongoose.Schema({
//   section: {
//     type: String,
//     required: true,
//   },
//   chartertype: {
//     type: String,
//     required: true,
//   },
//   subCategoryName: {
//     type: String,
//     required: true,
//   },
//   pax: {
//     type: String,
//     required: true,
//   },
//   speed: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: "This file is required.",
//   },
//   availability: {
//     type: String,
//     enum:['yes','no'],
//     required: true,
//     default: "no",
//   },
//   bookingtype: {
//     type: String,
//     required: true,
//   },
//   departure: {
//     type: String,
//     required: true,
//   },
//   arrival: {
//     type: String,
//     required: true,
//   },
//   journeytype: {
//     type: String,
//     required: true,
//     enum:["one-way","round-trip","multi-leg"],
//     default:"one-way"
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   yom: {
//     type: String,
//     required: true,
//   },
//   seats: {
//     type: String,
//     required: true,
//   },
//   crew: {
//     type: String,
//     required: true,
//   },
//   airhosts: {
//     type: String,
//     required: true,
//   },
//   levatory: {
//     type: String,
//     required: true,
//   },
//   fromtime: {
//     type: String,
//     required: true,
//   },
//   endtime: {
//     type: String,
//     required: true,
//   },
//   flyingrange: {
//     type: String,
//     required: true,
//   },
//   cabinwidth: {
//     type: String,
//     required: true,
//   },
//   cabinheight: {
//     type: String,
//     required: true,
//   },
//   baggage: {
//     type: String,
//     required: true,
//   },
//   cabinlength: {
//     type: String,
//     required: true,
//   },
//   pilot: {
//     type: String,
//     required: true,
//   },
//   discount: {
//     type: String,
//     required: true,
//   },
//   discountprice: {
//     type: String,
//     required: true,
//     default:"0",
//   },
//   duration: {
//     type: String,
//     required: true,
//   },
//   reachdate:{
//     type:String,
//     required:true
//   },
//   yor:{
//     type:String,
//     required:true
//   },
//   targetprice:{
//     type:String,
//     required:true
//   },
//   brokercompany:{
//     type:String,
//     required:true
//   },
//   flexibility:{
//     type:String,
//     required:true,
//     enum:["yes","no"],
//     default:"no"
//   },
//   operatorname:{
//     type:String,
//     required:true,
//   },
//   operatoremail:{
//     type:String,
//     required:true,
//     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
//   },
//   operatorphone:{
//     type:String,
//     match: [/^\d{10}$/, "Please enter a valid phone number"],
//     required:true
//   }
// });

// module.exports = mongoose.model("Subcategory", SubcategorySchema);
const mongoose = require("mongoose");
const SubcategorySchema = mongoose.Schema({
  from:{
    type:String
  },
  section:{
    type:String
  },
  to:{
    type:String
  },
  chartertype:{
    type:String
  },
  categoryName:{
    type:String
  },
  subCategoryName:{
    type:String
  },
  description:{
    type:String
  },
  date:{
    type:String
  },
  pax:{
    type:String
  },
  availability:{
    type:String
  },
  addedBy:{
    type:String
  },
  price:{
    type:String
  },
  airhosts:{
    type:String
  },
  fromtime:{
    type:String
  },
  endtime:{
    type:String
  },
  discount:{
    type:String
  },
  discountprice:{
    type:String
  },
  duration:{
    type:String
  },
  reachdate:{
    type:String
  },
  targetprice:{
    type:String
  },
  brokercompany:{
    type:String
  },
  brokerName:{
    type:String
  },
  brokerEmail:{
    type:String
  },
  brokerPhone:{
    type:String
  },
  operatoremail:{
    type:String
  },
  operatorname:{
    type:String
  },
  operatorphone:{
    type:String
  }
});

module.exports = mongoose.model("Subcategory", SubcategorySchema);
