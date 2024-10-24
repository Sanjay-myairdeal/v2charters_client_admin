const Categorymodify=require('../models/Categorymodify')
const SubCategory=require('../models/Subcategory')
/**
 * Filter flights by type and category
 */

exports.filterByTypeAndCategory = async (req, res) => {
  try {
      const { section, chartertype } = req.params;
      
      if (!section) {
          return res.status(400).json({ message: "'section' parameter is missing." });
      }
      if (!chartertype) {
          return res.status(400).json({ message: "'chartertype' parameter is missing." });
      }

      const data = await SubCategory.find({ section, chartertype }).populate({
        path:'addedBy',
        select:'-password -__v  -_id',
        populate:{
          path:'role',
          select:'-permissions -__v '
        }
      });
      
      if (data.length === 0) {
          return res.status(404).json({ message: `No subcategories found for section '${section}' and charter type '${chartertype}'.` });
      }

      return res.status(200).json({ message: "Subcategories fetched successfully.", data });
  } catch (error) {
      console.error("Error fetching subcategories:", error.message);
      return res.status(500).json({ message: "An error occurred while fetching subcategories.", error: error.message });
  }
};


  /**
   * Filter the Data based upon the Category Type
   */
  exports.getsubCategorybyCategory = async (req, res) => {
    try {
      const category = req.params.chartertype;
      // console.log(type);
      if (!category) {
        return res.status(404).json({ message: "Charter type is missing" });
      }
      const filldata = await SubCategory.find({ chartertype: category });
      if (filldata.length === 0) {
        return res.status(400).json({
          message: "No such subcategory exists for the given charter type",
        });
      }
      return res.status(200).json({
        message: "Flights are fetched successfully",
        sortedData: filldata,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  

  
  /**
   * Get category based on Type
   */
  exports.filterByType = async (req, res) => {
    try {
      const urlType = req.params.type;
      if (!urlType) {
        res.status(404).json({ message: "params in the url is not Found" });
      }
      const filteredCategory = await Categorymodify.find({ section: urlType }).populate({
        path:'addedBy',
        select:'-password -__v  -_id',
        populate:{
          path:'role',
          select:'-permissions -__v '
        }
      });
      if (filteredCategory.length == 0) {
        return res.status(404).json({ message: "No Categories of specific type" });
      }
  
      res
        .status(200)
        .json({ message: "Filtered Data Successfully", data: filteredCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server is Error" });
    }
  };
  
  
/**
 * Api for the Subcatgeorie of Type
 */
exports.filterSubCategoryByType = async (req, res) => {
  try {
    let type = req.params.type;

    // Trim whitespace from the type parameter
    type = type.trim();

    // Check if the 'type' parameter is provided
    if (!type) {
      return res.status(400).json({ message: "'type' parameter is missing." });
    }

    // Fetch subcategories by type
    const filteredSubCategory = await SubCategory.find({ section:type });

    // Check if any subcategories were found
    if (filteredSubCategory.length === 0) {
      return res.status(404).json({ message: "No data found for the specified Type" });
    }

    // Return the filtered subcategories
    return res.status(200).json({
      message: "SubCategory fetched Successfully",
      data: filteredSubCategory,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching subcategories.",
      error: error.message,
    });
  }
};
