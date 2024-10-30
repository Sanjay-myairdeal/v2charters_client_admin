const Categorymodify = require("../models/Categorymodify");
const SubCategory = require("../models/Subcategory");

/**
 * Filter flights by type and category
 */
exports.filterByTypeAndCategory = async (req, res) => {
  try {
    const { section, chartertype } = req.params;

    if (!section || !chartertype) {
      return res.status(400).json({ 
        message: `${!section ? "'section'" : "'chartertype'"} parameter is missing.` 
      });
    }

    const data = await SubCategory.find({
      section,
      chartertype,
      isDeleted: false,
    }).populate({
      path: "addedBy",
      select: "-password -__v -_id",
      populate: { path: "role", select: "-permissions -__v" },
    });

    if (data.length === 0) {
      return res.status(404).json({ 
        message: `No subcategories found for section '${section}' and charter type '${chartertype}'.` 
      });
    }

    return res.status(200).json({ message: "Subcategories fetched successfully.", data });
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);
    return res.status(500).json({ 
      message: "An error occurred while fetching subcategories.", 
      error: error.message 
    });
  }
};

/**
 * Filter data based on the charter type
 */
exports.getsubCategorybyCategory = async (req, res) => {
  try {
    const chartertype = req.params.chartertype;
    if (!chartertype) {
      return res.status(400).json({ message: "Charter type is missing." });
    }

    const filldata = await SubCategory.find({
      chartertype,
      isDeleted: false,
    });

    if (filldata.length === 0) {
      return res.status(404).json({
        message: "No subcategories found for the specified charter type.",
      });
    }

    return res.status(200).json({
      message: "Flights fetched successfully.",
      data: filldata,
    });
  } catch (error) {
    console.error("Error fetching flights by charter type:", error.message);
    return res.status(500).json({ 
      message: "Server error occurred while fetching flights.", 
      error: error.message 
    });
  }
};

/**
 * Get categories based on the section type
 */
exports.filterByType = async (req, res) => {
  try {
    const section = req.params.type;
    if (!section) {
      return res.status(400).json({ message: "'type' parameter is missing." });
    }

    const filteredCategory = await Categorymodify.find({
      section,
      isDeleted: false,
    }).populate({
      path: "addedBy",
      select: "-password -__v -_id",
      populate: { path: "role", select: "-permissions -__v" },
    });

    if (filteredCategory.length === 0) {
      return res.status(404).json({ message: "No categories found for the specified type." });
    }

    return res.status(200).json({ message: "Categories fetched successfully.", data: filteredCategory });
  } catch (error) {
    console.error("Error fetching categories by type:", error.message);
    return res.status(500).json({ 
      message: "Server error occurred while fetching categories.", 
      error: error.message 
    });
  }
};

/**
 * Filter subcategories based on the section type
 */
exports.filterSubCategoryByType = async (req, res) => {
  try {
    const type = req.params.type?.trim();

    if (!type) {
      return res.status(400).json({ message: "'type' parameter is missing." });
    }

    const filteredSubCategory = await SubCategory.find({
      section: type,
      isDeleted: false,
    });

    if (filteredSubCategory.length === 0) {
      return res.status(404).json({ message: "No subcategories found for the specified type." });
    }

    return res.status(200).json({
      message: "Subcategories fetched successfully.",
      data: filteredSubCategory,
    });
  } catch (error) {
    console.error("Error fetching subcategories by type:", error.message);
    return res.status(500).json({ 
      message: "An error occurred while fetching subcategories.", 
      error: error.message 
    });
  }
};
