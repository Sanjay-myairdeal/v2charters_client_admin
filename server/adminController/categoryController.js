const Categorymodify = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");
const cloudinary = require("cloudinary").v2;

/**
 *  Cloudinary configuration
 */
cloudinary.config({
  cloud_name: "dybrajkta",
  api_key: "921983243972892",
  api_secret: "c4n72FykTGrxsKpDzpADvNsqf5U",
});

/**
 * Modify Category Data
 */
exports.getModifyCategories = async (req, res) => {
  try {
    const data = await Categorymodify.find({}).populate({
      path:'addedBy',
      select:'-password -__v',
      populate:{
        path:'role',
        select:'-password -__v -permissions'
      }
    });
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
    const {
      chartertype,
      description,
      section,
      categoryName,
      aircraftType,
      baggage,
      speed,
      seats,
      yom,
      pilots,
      crew,
      flyingRange,
      cabinHeight,
      cabinWidth,
      lavatory,
      yor,
      withoutICU,
      withICU,
      paramedics,
      techStops,
    } = req.body;
    // Extract the userId from the request object (set by verifyToken middleware)
    const userId = req.userId; // This comes from the decoded JWT token
    // Check if an image file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imagePath = req.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath);

    // Create new category modification document
    const newModify = new Categorymodify({
      chartertype,
      description,
      section,
      categoryName,
      aircraftType,
      baggage,
      speed,
      seats,
      yom,
      pilots,
      crew,
      flyingRange,
      cabinHeight,
      cabinWidth,
      lavatory,
      yor,
      withoutICU,
      withICU,
      paramedics,
      techStops,
      image: result.secure_url, // Store Cloudinary URL in the image field
      addedBy:userId
    });

    // Save the new document to the database
    const savedCategory = await newModify.save();

    // Respond with success and return the saved document
    return res.status(200).json({
      message: "Data inserted successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);

    // Return server error response
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Edit Category by ID
 */
exports.editModifyCharterById = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      chartertype,
      description,
      section,
      categoryName,
      aircraftType,
      baggage,
      speed,
      seats,
      yom,
      pilots,
      crew,
      flyingRange,
      cabinHeight,
      cabinWidth,
      lavatory,
      yor,
      withoutICU,
      withICU,
      paramedics,
      techStops,
      addedBy
    } = req.body;

    // Fetch the existing category before updating (to retrieve the current image)
    const preData = await Categorymodify.findById(id);
    if (!preData) {
      return res.status(404).json({ message: "Category not found" });
    }
    // console.log(preData)
    let image;
    // Handle image upload if a new file is provided
    if (req.file) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    } else {
      // Use the existing image if no new image file is provided
      image = req.body.image || preData.image;
    }
const userId=req.userId
    // Update the main Categorymodify document
    const updatedCategory = await Categorymodify.findByIdAndUpdate(
      id,
      {
        chartertype,
        description,
        section,
        categoryName,
        aircraftType,
        baggage,
        speed,
        seats,
        yom,
        pilots,
        crew,
        flyingRange,
        cabinHeight,
        cabinWidth,
        lavatory,
        yor,
        withoutICU,
        withICU,
        paramedics,
        techStops,
        addedBy:userId,
        image, // Ensuring we are keeping the original image if no new one is provided
      },
      { new: true }
    );

    // Check if the update was successful
    if (!updatedCategory) {
      return res.status(404).json({ message: "Error in updating data" });
    }
    // console.log(updatedCategory)
    // Now update all Subcategory documents where the chartertype, section, and categoryName are the same as the pre-update data
    const updatedSubcategories = await Subcategory.updateMany(
      {
        chartertype: preData.chartertype, // Match pre-update chartertype
        section: preData.section, // Match pre-update section
        // Use case-insensitive matching for categoryName to avoid issues with casing differences
        categoryName: { $regex: new RegExp(`^${preData.categoryName}$`, "i") },
      },
      {
        chartertype: updatedCategory.chartertype, // Update to the new chartertype
        section: updatedCategory.section, // Update to the new section
        categoryName: updatedCategory.categoryName, // Update to the new categoryName
      }
    );

    //console.log("Updated Subcategories:", updatedSubcategories);debugging

    // Respond with a success message and the updated category
    return res.status(200).json({
      message: "Data updated successfully",
      updatedCategory,
      updatedSubcategories: updatedSubcategories.modifiedCount, // Show how many subcategories were updated
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
    await Subcategory.deleteMany({
      chartertype: category.chartertype,
    });

    // Delete the Categorymodify document
    await Categorymodify.findByIdAndDelete(id);

    // Respond with a success message
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
