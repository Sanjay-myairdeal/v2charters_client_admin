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
    const { chartertype, description } = req.body;
    // console.log(chartertype, description);
    // Validate required fields
    if (!chartertype || !description) {
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
 * Edit Category by id
 */
exports.editModifyCharterById = async (req, res) => {
  try {
    const id = req.params.id;
    const { chartertype, description } = req.body;

    if (!id || (!chartertype && !description && !req.file)) {
      return res
        .status(400)
        .json({ message: "ID or fields to update are missing" });
    }

    let image;

    if (req.file) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    } else {
      image = req.body.image;
    }

    const updatedCategory = await Categorymodify.findByIdAndUpdate(
      id,
      { chartertype, description, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Error in updating data" });
    }
    return res
      .status(200)
      .json({ message: "Data updated successfully", updatedCategory });
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

    const category = await Categorymodify.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Data not found" });
    }

    await Categorymodify.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Sub Category Data
 */
exports.getSubCategories = async (req, res) => {
  try {
    const data = await Subcategory.find({});
    if (!data || data.length === 0) {
      return res.status(200).json({ message: "No subCategory data currently" });
    }
    return res.status(200).json({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Add SubCategories
 */
exports.addSubCategories = async (req, res) => {
  try {
    const {
      chartertype,
      pax,
      speed,
      price,
      description,
      availability,
      bookingtype,
      departure,
      arrival,
      journeytype,
      date,
    } = req.body;

    // Validate other fields if necessary
    if (
      !chartertype ||
      !pax ||
      !speed ||
      !price ||
      !availability ||
      !description ||
      !bookingtype ||
      !departure ||
      !arrival ||
      !journeytype ||
      !date
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    // Create new category modification
    const newModify = new Subcategory({
      chartertype,
      pax,
      speed,
      price,
      description,
      availability,
      bookingtype,
      departure,
      arrival,
      journeytype,
      date,
      image: result.secure_url,
    });

    // Save to database
    await newModify.save();
    return res
      .status(201)
      .json({ message: "Data inserted successfully", addedData: newModify });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Filter the Data based upon the Category Type
 */
exports.getsubCategorybyType = async (req, res) => {
  try {
    const type = req.params.chartertype;
    console.log(type);
    if (!type) {
      return res.status(404).json({ message: "Charter type is missing" });
    }
    const filldata = await Subcategory.find({ chartertype: type });
    if (filldata.length === 0) {
      return res
        .status(400)
        .json({
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
 * Edit sub category by Id
 */

exports.editSubCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Id is missing" });
    }
    const {
      chartertype,
      pax,
      speed,
      price,
      description,
      availability,
      bookingtype,
      departure,
      arrival,
      journeytype,
      date,
    } = req.body;
    if (
      !chartertype ||
      !pax ||
      !speed ||
      !price ||
      !availability ||
      !description ||
      !bookingtype ||
      !departure ||
      !arrival ||
      !journeytype ||
      !date
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let image;

    if (req.file) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    } else {
      image = req.body.image;
    }

    const updatedData = await Subcategory.findByIdAndUpdate(
      id,
      {
        chartertype,
        pax,
        speed,
        price,
        description,
        availability,
        bookingtype,
        departure,
        arrival,
        journeytype,
        date,
        image: image,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(400).json({ message: "Error in updating the data" });
    }

    return res
      .status(200)
      .json({ message: "Data updated successfully", updated: updatedData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete Sub category
 */

exports.deleteModifySubCharterById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const category = await Subcategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Data not found" });
    }

    await Subcategory.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
