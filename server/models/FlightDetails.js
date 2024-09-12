const mongoose = require("mongoose");

const FlightDetailsSchema = mongoose.Schema({
  section: {
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
    enum: ["one-way", "round-trip", "multi-leg"],
    default: "one-way",
  },
  date: {
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
  reachdate: {
    type: String,
    required: true,
  },
  pax: {
    type: String,
    required: true,
  },
  chartertype: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FlightDetails", FlightDetailsSchema);
