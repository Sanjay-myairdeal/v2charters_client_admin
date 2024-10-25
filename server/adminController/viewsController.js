const Type = require("../models/Type");
const Category = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");

exports.viewData = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const data = await Type.find({ addedBy: id }).populate({
      path:'addedBy',
      select:'-password -__v ',
      populate:{
        path:'role',
        select:'-permissions -__v'
      }
    });
    const categoryData = await Category.find({ addedBy: id }).populate({
      path:'addedBy',
      select:'-password -__v ',
      populate:{
        path:'role',
        select:'-permissions -__v'
      }
    });
    const subCategoryData = await Subcategory.find({ addedBy: id }).populate({
      path:'addedBy',
      select:'-password -__v ',
      populate:{
        path:'role',
        select:'-permissions -__v'
      }
    });
    return res
      .status(200)
      .json({
        message: "Data added by the User",
        Types: data,
        Category: categoryData,
        Subcategory: subCategoryData,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
