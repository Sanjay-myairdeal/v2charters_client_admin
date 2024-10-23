const Type = require("../models/Type");
const Category = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");

exports.viewData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Type.find({ addedBy: id });
    const categoryData = await Category.find({ addedBy: id });
    const subCategoryData = await Subcategory.find({ addedBy: id });

    if (
      data.length === 0 &&
      categoryData.length === 0 &&
      subCategoryData.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "No data added by the particular User" });
    }

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
