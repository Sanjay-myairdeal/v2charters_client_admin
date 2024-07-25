const mongoose = require("mongoose");
const EmptySchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  passengers: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
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
  image:{
    type:String,
    required:'This file is required.'
},
availability: {
  type: String,
  required: true,
  default:"no"
}
});
module.exports = mongoose.model("Emptyleg", EmptySchema);
