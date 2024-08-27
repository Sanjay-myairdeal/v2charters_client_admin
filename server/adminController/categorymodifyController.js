const Categorymodify = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");
const Type = require("../models/Type");
const email_verifier = require("email-verifier-node");
const Booking = require("../models/Booking");
const cloudinary = require("cloudinary").v2;
const Log=require('../models/Log')
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
 * Edit Category by id
 */
exports.editModifyCharterById = async (req, res) => {
  try {
    const id = req.params.id;
    const { chartertype, description, section } = req.body;

    if (!id || (!chartertype && !description && !req.file && !section)) {
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
      { chartertype, description, image, section },
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
      subCategoryName,
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
      yom,
      seats,
      crew,
      baggage,
      airhosts,
      levatory,
      fromtime,
      endtime,
      cabinheight,
      cabinwidth,
      flyingrange,
      cabinlength,
      pilot,
      discount,
    } = req.body;

    // Validate other fields if necessary
    if (
      !chartertype ||
      !subCategoryName ||
      !pax ||
      !speed ||
      !price ||
      !availability ||
      !description ||
      !bookingtype ||
      !departure ||
      !arrival ||
      !journeytype ||
      !date ||
      !yom ||
      !seats ||
      !crew ||
      !baggage ||
      !airhosts ||
      !levatory ||
      !fromtime ||
      !endtime ||
      !cabinheight ||
      !cabinwidth ||
      !flyingrange ||
      !cabinlength ||
      !pilot ||
      !discount
     
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.file ? req.file.path : null;
 const caldiscount=(discount/100)*price
//  console.log(caldiscount)
    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    // Create new category modification
    const newModify = new Subcategory({
      chartertype,
      subCategoryName,
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
      yom,
      seats,
      crew,
      baggage,
      airhosts,
      levatory,
      fromtime,
      endtime,
      cabinheight,
      cabinwidth,
      flyingrange,
      cabinlength,
      pilot,
      discount,
      discountprice:caldiscount,
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
      subCategoryName,
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
      yom,
      seats,
      crew,
      baggage,
      airhosts,
      levatory,
      fromtime,
      endtime,
      cabinheight,
      cabinwidth,
      flyingrange,
      cabinlength,
      pilot,
      discount
    } = req.body;
    if (
      !chartertype ||
      !subCategoryName ||
      !pax ||
      !speed ||
      !price ||
      !availability ||
      !description ||
      !bookingtype ||
      !departure ||
      !arrival ||
      !journeytype ||
      !date ||
      !yom ||
      !seats ||
      !crew ||
      !baggage ||
      !airhosts ||
      !levatory ||
      !fromtime ||
      !endtime ||
      !cabinheight ||
      !cabinwidth ||
      !flyingrange ||
      !cabinlength ||
      !pilot ||
      !discount
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let image;
    const caldiscount=(discount/100)*price
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
        subCategoryName,
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
        yom,
        seats,
        crew,
        baggage,
        airhosts,
        levatory,
        fromtime,
        endtime,
        cabinheight,
        cabinwidth,
        flyingrange,
        image: image,
        cabinlength,
        pilot,
        discount,
        caldiscount:caldiscount
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

/**
 * On Demand Search Api
 */
exports.onDemandSearch = async (req, res) => {
  try {
    const { departure, arrival, date, pax, section } = req.body;
    if (!departure || !arrival || !date || !pax || !section) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const typeData = await Type.findOne({ section: section });
    if (!typeData) {
      return res
        .status(400)
        .json({ message: "There is no such type of Service" });
    }

    // console.log(typeData);

    const categoryData = await Categorymodify.find({ section: typeData.section });

    if (!categoryData || categoryData.length === 0) {
      return res
        .status(400)
        .json({ message: "No Categories of Particular Section" });
    }

    // console.log(categoryData);

    const chartertypes = categoryData.map(cat => cat.chartertype);
    // console.log('Charter Types:', chartertypes);

    const SubCategoryType = await Subcategory.find({
      chartertype: { $in: chartertypes },
      departure: departure,
      arrival: arrival,
      date: date,
      pax: pax,
    });

    // console.log(SubCategoryType);
    if (SubCategoryType.length === 0) {
      return res
        .status(400)
        .json({ message: "Sorry, there are no flights for the given search" });
    }
    res
      .status(200)
      .json({ message: "Data Searched Successfully", data: SubCategoryType });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/**
 * Type Section Starts
 */

exports.sectionAdding = async (req, res) => {
  try {
    const { section, active } = req.body;
    if (!section || !active) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const exist = await Type.findOne({ section: section, active: active });
    if (exist) {
      return res.status(400).json({ message: "Type already exists" });
    }
    const addData = new Type({
      section,
      active,
    });
    await addData.save();
    res.status(201).json({ message: "Type added successfully", data: addData });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error occurred" });
  }
};

/**
 * Get section for all Data
 */

exports.getAllTypes = async (req, res) => {
  try {
    const data = await Type.find({});
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

    // Extract chartertype values from related Categorymodify documents
    const cateData = await Categorymodify.find({ section: typeData.section });
    const chartertypes = cateData.map(cat => cat.chartertype);

    // Delete related Categorymodify documents
    await Categorymodify.deleteMany({ section: typeData.section });

    // Delete related Subcategory documents
    await Subcategory.deleteMany({ chartertype: { $in: chartertypes } });

    // Delete the Type document
    await Type.findByIdAndDelete(id);

    // Respond with a success message
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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
    const filteredCategory = await Categorymodify.find({ section: urlType });
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
 * Type Editing
 */
exports.editTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    const {  section, active } = req.body;

    if (!section || !active) {
      return res.status(400).json({ message: "Fields to update are missing" });
    }

    const updatedType = await Type.findByIdAndUpdate(
      id,
      { section , active},
      { new: true }
    );

    if (!updatedType) {
      return res.status(404).json({ message: "Error in updating data" });
    }
    return res
      .status(200)
      .json({ message: "Data updated successfully", data:updatedType });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};






/**
 * Get Sub Category based on Category
 */
exports.getSubCategoryId = async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    if (!subcategoryId) {
      return res.status(400).json({ message: "Subcategory ID is missing in the URL" });
    }

    const filteredSubCategory = await Subcategory.find({ _id: subcategoryId });

    if (!filteredSubCategory || filteredSubCategory.length === 0) {
      return res.status(404).json({ message: "No subcategory found for the provided ID" });
    }

    return res.status(200).json({
      message: "Subcategory fetched successfully",
      data: filteredSubCategory
    });

  } catch (error) {
    console.error("Error fetching subcategory:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



/**Booking Section Starts */

/** Get All Bookings */
exports.getAllBookings = async (req, res) => {
  try {
    const data = await Booking.find({});
    if (!data) {
      return res
        .status(404)
        .json({ message: "Error in fetching the Booking data" });
    }
    return res.status(200).json({ message: "Data fetched successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**Add booking */
exports.addBooking = async (req, res) => {
  try {
    const { type, departure, arrival, passengers, date, email, phone } = req.body;

    // Check for missing fields
    if (!type || !passengers || !departure || !arrival || !date || !email || !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const verificationResult = await email_verifier.verify_email(email);
    if (!verificationResult.is_verified) {
      return res.status(400).json({
        message: "The email account that you tried to reach does not exist.",
      });
    }

    // Create a new booking
    const newBooking = new Booking({
      type,
     departure,
      arrival,
      passengers,
      date,
      email,
      phone,
    });

    // Save the booking
    await newBooking.save();

    return res
      .status(200)
      .json({ message: "Booking data inserted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

/** Get a Booking by ID */
exports.getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Update a Booking by ID */
exports.editBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const { type, departure, arrival, passengers, date, email, phone } = req.body;

    if (!type || !passengers || !arrival || !departure || !date || !email || !phone) {
      return res.status(400).json({ message: "Fields to update are missing" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { type, departure, arrival, passengers, date, email, phone },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Error in updating data" });
    }
    return res
      .status(200)
      .json({ message: "Data updated successfully", updatedBooking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Delete a Booking by ID */
exports.deleteBookingById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Data not found" });
    }

    await Booking.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Date Filter
 */
exports.filterDate = async (req, res) => {
  try {
    const { from, to } = req.body;

    // Check if the from and to dates are provided
    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "From and To dates are required" });
    }

    const allBookings = await Booking.find();

    // Filter bookings within the date range
    const filteredData = allBookings.filter((item) => {
      return item.date >= from && item.date <= to;
    });

    // Send the filtered data in the response
    res.status(200).json({
      message: "Data fetched successfully",
      data: filteredData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/** Booking Section Ends */


/**
 * Log Details API
 */

//adding log details
exports.addLogDetails=async(req,res)=>{
  try {
    const {log}=req.body;
    if(!log){
     return res.status(404).json({message:"log details not captured"})
    }
  const logData=new Log({
    log:log
  })
  await logData.save();
  return res.status(200).json({message:"Log data recorded successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server is not running"})
  }
}

//get all log details
exports.getAllLogs = async (req, res) => {
  try {
    const response = await Log.find({});
    
    if (response.length === 0) {
      return res.status(404).json({ message: "No log details found" });
    }
    
    return res.status(200).json({
      message: "Log details fetched successfully",
      data: response
    });
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};