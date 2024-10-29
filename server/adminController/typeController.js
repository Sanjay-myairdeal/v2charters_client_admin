const Categorymodify = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");
const Type = require("../models/Type");
const cloudinary=require("../cloudinary/cloudinary")
const Logs=require('../models/Logs')
/**
 * Type Section Starts
 */

exports.sectionAdding = async (req, res) => {
  try {
    const { section, active } = req.body;

    // Validate if required fields are present
    if (!section || active === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check if the section already exists with the same 'active' status
    const exist = await Type.findOne({ section, active });
    if (exist) {
      return res.status(400).json({ message: "Type already exists" });
    }

    // Get userId from the token (set in previous middleware)
    const userId = req.userId;

    // Create new Type data
    const addData = new Type({
      section,
      active,
      addedBy: userId
    });

  await addData.save()
  const logs=new Logs({
    userId:userId,
    action:'add',
    targetType:'type',
    targetId:addData._id,
    targetData:addData
  }) 
  await logs.save();
    // Send success response with the populated data
    res.status(201).json({ message: "Type added successfully", data: addData });

  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ message: error.message || "Error occurred" });
  }
};

  /**
   * Get section for all Data
   */
  
  exports.getAllTypes = async (req, res) => {
    try {
      const data = await Type.find({}).populate({
        path:'addedBy',
        select:'-password -__v',
        populate:{
          path:'role',
          select:'-password -__v -permissions'
        }
      });
      if (!data) {
        return res.status(404).json({ message: "Error in fetching the data" });
      }
      return res.status(200).json({ message: "Data fetched successfully", data });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  /**
   * Delete Type
   */
  
  exports.deleteTypeById = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: "ID is missing" });
      }
  
      // Fetch the Type document by its ID
      const typeData = await Type.findById(id);
      if (!typeData) {
        return res.status(404).json({ message: "Type not found" });
      }
  
  
    // Delete related Categorymodify documents
      await Categorymodify.deleteMany({ section: typeData.section });
  
      // Delete related Subcategory documents
      await Subcategory.deleteMany({ section: typeData.section });
  
      // Delete the Type document
      await Type.findByIdAndDelete(id);
  
      // Respond with a success message

      const logs=new Logs({
        userId:userId,
        action:'delete',
        targetType:'type',
        targetId:typeData._id,
        targetData:typeData
      }) 
      await logs.save();
      return res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  /**
   * Type Editing
   */
  exports.editTypeById = async (req, res) => {
    try {
      const id = req.params.id;
      const { section, active ,addedBy} = req.body;
  
      // Validate input
      if (!section || active === undefined) {
        return res.status(400).json({ message: "Fields to update are missing" });
      }
  
      // Fetch the pre-update Type data
      const preData = await Type.findById(id);
      if (!preData) {
        return res.status(404).json({ message: "Type not found" });
      }
  
     // console.log("Pre-update section:", preData.section); Debugging log
  const userId=req.userId
      // Update Type document
      const updatedType = await Type.findByIdAndUpdate(
        id,
        { section, active ,addedBy:userId },
        { new: true }
      );
  
      if (!updatedType) {
        return res.status(404).json({ message: "Error in updating Type data" });
      }
  
      // Update all related documents in Categorymodify where section matches the old section
      const updatedCategories = await Categorymodify.updateMany(
        { section: preData.section.trim() }, // Ensure matching with the previous section
        { $set: { section: section.trim() } } // Set the new section value
      );
  
      
      // Update all related documents in Subcategory where section matches the old section
      const updatedSubcategories = await Subcategory.updateMany(
        { section: preData.section.trim() }, // Ensure matching with the previous section
        { $set: { section: section.trim() } } // Set the new section value
      );
  
      const logs=new Logs({
        userId:userId,
        action:'edit',
        targetType:'type',
        targetId:preData._id,
        targetData:preData
      }) 
      await logs.save();
  
      return res.status(200).json({
        message: "Data updated successfully",
        data: {
          updatedType,
          updatedCategories: updatedCategories.modifiedCount,
          updatedSubcategories: updatedSubcategories.modifiedCount
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  