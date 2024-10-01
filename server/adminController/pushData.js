
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
      const filteredSubCategory = await Subcategory.find({ section:type });
  
   
  
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
  
  