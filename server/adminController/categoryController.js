const Categorymodify = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");
const cloudinary=require("../cloudinary/cloudinary")
const FlightDetails=require('../models/FlightDetails')
/**
 * Modify Category Data
 */
exports.getModifyCategories = async (req, res) => {
    try {
      const data = await Categorymodify.find({});
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No data found" });
      }
      return res.status(200).json({ message: "Data fetched successfully", data });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  
  /**
   * Post the Category data
   */
  exports.addModifyCategories = async (req, res) => {
    try {
      const { chartertype, description, section } = req.body;
      // console.log(chartertype, description);
      // Validate required fields
      if (!chartertype || !description || !section) {
        return res.status(400).json({ message: "Missing fields" });
      }
  
      const image = req.file ? req.file.path : null;
  
      if (!image) {
         return res.status(400).json({ message: "Image file is required" });
      }
  
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image);
  
      // Create new category modification
      const newModify = new Categorymodify({
        chartertype,
        description,
        image: result.secure_url,
        section,
      });
  
      // Save to database
      await newModify.save();
      return res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
      console.error("Error adding category:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  /**
   * Edit Category by ID
   */
  exports.editModifyCharterById = async (req, res) => {
    try {
      const id = req.params.id;
      const { chartertype, description, section } = req.body;
  
      // Check if ID or any fields to update are missing
      if (!id || (!chartertype && !description && !req.file && !section)) {
        return res
          .status(400)
          .json({ message: "ID or fields to update are missing" });
      }
  
      let image;
  
      // Handle image upload if a new file is provided
      if (req.file) {
        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
      } else {
        image = req.body.image; // If no new file, use the existing image
      }
  
      // Find the original category before the update (for comparison)
      const preData = await Categorymodify.findById(id);
      if (!preData) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Update the main Categorymodify document
      const updatedCategory = await Categorymodify.findByIdAndUpdate(
        id,
        { chartertype, description, image, section },
        { new: true }
      );
  
      // Check if the update was successful
      if (!updatedCategory) {
        return res.status(404).json({ message: "Error in updating data" });
      }
  
      // Update all Subcategory documents where the chartertype and section are the same as the pre-update data
      const updatedSubcategories = await Subcategory.updateMany(
        {
          chartertype: preData.chartertype, // Match pre-update chartertype
          section: preData.section // Match pre-update section
        },
        {
          chartertype: updatedCategory.chartertype, // Update to the new chartertype
          section: updatedCategory.section // Update to the new section
        }
      );
  
      // Respond with a success message and the updated category
      return res.status(200).json({
        message: "Data updated successfully",
        updatedCategory,
        updatedSubcategories: updatedSubcategories.modifiedCount // Show how many subcategories were updated
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  /**
   * Delete Category Data
   */
  exports.deleteModifyCharterById = async (req, res) => {
    try {
      const id = req.params.id;
  
      if (!id) {
        return res.status(400).json({ message: "ID is missing" });
      }
  
      // Fetch the Categorymodify document by its ID
      const category = await Categorymodify.findById(id);
    
      if (!category) {
        return res.status(404).json({ message: "Data not found" });
      }
  
      // Delete all Subcategory documents related to the chartertype of the fetched Categorymodify document
      await Subcategory.deleteMany({ chartertype: category.chartertype });
  
      // Delete the Categorymodify document
      await Categorymodify.findByIdAndDelete(id);
  
      // Respond with a success message
      return res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  