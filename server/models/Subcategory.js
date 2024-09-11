const mongoose = require("mongoose");
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
    required: true,
    default: "no",
  },
  bookingtype: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  journeytype: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  yom: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  crew: {
    type: String,
    required: true,
  },
  airhosts: {
    type: String,
    required: true,
  },
  levatory: {
    type: String,
    required: true,
  },
  fromtime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
  },
  flyingrange: {
    type: String,
    required: true,
  },
  cabinwidth: {
    type: String,
    required: true,
  },
  cabinheight: {
    type: String,
    required: true,
  },
  baggage: {
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
    type: String,
    required: true,
  },
  discountprice: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  reachdate:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Subcategory", SubcategorySchema);
