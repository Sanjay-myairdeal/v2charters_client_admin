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
const FlightDetailsSchema = require("./FlightDetails"); // Import the FlightDetails schema

const SubcategorySchema = mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  chartertype: {
    type: String,
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
  },
  pax: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: "This file is required.",
  },
  availability: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
    default: "no",
  },
  bookingtype: {
    type: String,
    required: true,
  },
  yom: { // Year of Manufacture
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  crew: {
    type: Number,
    required: true,
  },
  baggage: {
    type: String,
    required: true,
  },
  airhosts: {
    type: String,
    required: true,
  },
  levatory: { // Whether there is a restroom available
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  cabinheight: {
    type: String,
    required: true,
  },
  cabinwidth: {
    type: String,
    required: true,
  },
  flyingrange: {
    type: String,
    required: true,
  },
  cabinlength: {
    type: String,
    required: true,
  },
  pilot: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  discountprice: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  yor: { // Year of Refurbishment
    type: String,
    required: true,
  },
  targetprice: {
    type: Number,
    required: true,
  },
  brokercompany: {
    type: String,
    required: true,
  },
  flexibility: {
    type: String,
    required: true,
  },
  operatorname: {
    type: String,
    required: true,
  },
  operatoremail: {
    type: String,
    required: true,
  },
  operatorphone: {
    type: String,
    required: true,
  },
  flightDetails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlightDetails", // Reference the FlightDetails schema
  }]
});

module.exports = mongoose.model("Subcategory", SubcategorySchema);
