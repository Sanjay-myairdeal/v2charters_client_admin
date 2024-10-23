const mongoose = require("mongoose");
const Subcategory = require("./Subcategory");

const categoryModifySchema = new mongoose.Schema({
  section: {
    type: String,
  },
  chartertype: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: "This file is required.",
  },
  categoryName: {
    type: String,
  },
  aircraftType: {
    type: String,
  },
  baggage: {
    type: String,
  },
  speed: {
    type: String,
  },
  seats: {
    type: String,
  },
  yom: {
    type: String, // Year of manufacture
  },
  pilots: {
    type: String,
  },
  crew: {
    type: String,
  },
  flyingRange: {
    type: String,
  },
  cabinHeight: {
    type: String,
  },
  cabinWidth: {
    type: String,
  },
  lavatory: {
    type: String,
  },
  yor: {
    type: String, // Year of refurbishment
  },
  withoutICU: {
    type: String,
  },
  withICU: {
    type: String,
  },
  paramedics: {
    type: String,
  },
  techStops: {
    type: String
  },
  addedBy:{
    type: String,  // Reference to the UserRole object
    required: true
  }
});

categoryModifySchema.pre("remove", async function (next) {
  try {
    await Subcategory.deleteMany({ charterType: this.charterType });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("CategoryModify", categoryModifySchema);
