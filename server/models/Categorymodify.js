const mongoose = require("mongoose");
const Subcategory = require("./Subcategory");
const categorymodifySchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  chartertype: {
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
});


categorymodifySchema.pre('remove',async(req,res,next)=>{
  try {
    await Subcategory.deleteMany({chartertype: this.chartertype});
    next();
  } catch (error) {
    next(error)
  }
})
module.exports = mongoose.model("Categorymodify", categorymodifySchema);
