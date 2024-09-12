const Categorymodify = require("../models/Categorymodify");
const Subcategory = require("../models/Subcategory");
const Type = require("../models/Type");
const email_verifier = require("email-verifier-node");
const Booking = require("../models/Booking");
const cloudinary = require("cloudinary").v2;
const Enquiry=require('../models/Enquiry')
const FlightDetails = require("../models/FlightDetails");
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



exports.addSubCategories = async (req, res) => {
  try {
    const {
      section,
      chartertype,
      subCategoryName,
      pax,
      speed,
      price,
      description,
      availability,
      bookingtype,
      yom,
      seats,
      crew,
      baggage,
      airhosts,
      levatory,
      cabinheight,
      cabinwidth,
      flyingrange,
      cabinlength,
      pilot,
      discount,
      duration,
      yor,
      targetprice,
      brokercompany,
      flexibility,
      operatorname,
      operatoremail,
      operatorphone,
      departure,
      arrival,
      journeytype,
      date,
      fromtime,
      endtime,
      reachdate
    } = req.body;

    // Validate required fields
    if (
      !section ||
      !chartertype ||
      !subCategoryName ||
      !pax ||
      !speed ||
      !price ||
      !availability ||
      !description ||
      !bookingtype ||
      !yom ||
      !seats ||
      !crew ||
      !baggage ||
      !airhosts ||
      !levatory ||
      !cabinheight ||
      !cabinwidth ||
      !flyingrange ||
      !cabinlength ||
      !pilot ||
      !discount ||
      !duration ||
      !yor ||
      !targetprice ||
      !brokercompany ||
      !flexibility ||
      !operatorname ||
      !operatoremail ||
      !operatorphone ||
      !departure ||
      !arrival ||
      !journeytype ||
      !date ||
      !fromtime ||
      !endtime ||
      !reachdate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.file ? req.file.path : null;
    const caldiscount = (discount / 100) * price;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    // Create flight details object
    const flightDetails = new FlightDetails({
      section,
      departure,
      arrival,
      journeytype,
      date,
      fromtime,
      endtime,
      reachdate,
      pax,
      chartertype
    });

    // Save flight details to the database
    await flightDetails.save();

    // Check if subcategory exists
    let subcategory = await Subcategory.findOne({
      section,
      chartertype
    });

    if (subcategory) {
      // Subcategory exists, add flight details to the existing subcategory
      subcategory.flightDetails.push(flightDetails._id);
      await subcategory.save();
      return res.status(200).json({
        message: "Flight details added to existing subcategory",
        addedData: subcategory
      });
    } else {
      // Subcategory does not exist, create a new one
      subcategory = new Subcategory({
        section,
        chartertype,
        subCategoryName,
        pax,
        speed,
        price,
        description,
        availability,
        bookingtype,
        image: result.secure_url,
        yom,
        seats,
        crew,
        baggage,
        airhosts,
        levatory,
        cabinheight,
        cabinwidth,
        flyingrange,
        cabinlength,
        pilot,
        discount,
        discountprice: caldiscount,
        duration,
        yor,
        targetprice,
        brokercompany,
        flexibility,
        operatorname,
        operatoremail,
        operatorphone,
        flightDetails: [flightDetails._id] // Reference to flight details
      });

      // Save subcategory to the database
      await subcategory.save();
      return res.status(201).json({
        message: "New subcategory created with flight details",
        addedData: subcategory
      });
    }
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
    // console.log(type);
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
      section,
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
      reachdate,
      duration,
      yor,
      targetprice,
      brokercompany,
      flexibility,
      operatorname,
      operatoremail,
      operatorphone
    } = req.body;
    if (
      !section ||
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
      !discount ||
      !reachdate ||
      !duration ||
      !yor ||
      !targetprice ||
      !brokercompany ||
      !flexibility ||
      !operatoremail ||
      !operatorname ||
      !operatorphone
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
        duration,
        reachdate,
        section,
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
        caldiscount:caldiscount,
        yor,
      targetprice,
      brokercompany,
      flexibility,
      operatorname,
      operatoremail,
      operatorphone
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

    // Search for subcategories matching the search criteria
    const subcategories = await Subcategory.find({
      section,
      // Other filters here if needed
    }).populate({
      path: 'flightDetails',
      match: {
        departure,
        arrival,
        date,
        pax,
      },
      select: 'departure arrival date pax' // Adjust fields based on what you need
    });

    // Filter out subcategories that don't have any matching flight details
    const filteredSubcategories = subcategories.filter(subcat => subcat.flightDetails.length > 0);

    if (filteredSubcategories.length === 0) {
      return res.status(400).json({ message: "Sorry, there are no flights for the given search" });
    }

    res.status(200).json({
      message: "Data Searched Successfully",
      data: filteredSubcategories
    });
  } catch (error) {
    console.error(error);
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


  // Delete related Categorymodify documents
    await Categorymodify.deleteMany({ section: typeData.section });

    // Delete related Subcategory documents
    await Subcategory.deleteMany({ section: typeData.section });

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
    const { section, active } = req.body;

    // Validate input
    if (!section || active === undefined) {
      return res.status(400).json({ message: "Fields to update are missing" });
    }

    // Fetch the pre-update Type data
    const preData = await Type.findById(id);
    if (!preData) {
      return res.status(404).json({ message: "Type not found" });
    }

    console.log("Pre-update section:", preData.section); // Debugging log

    // Update Type document
    const updatedType = await Type.findByIdAndUpdate(
      id,
      { section, active },
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
    const { name,type, departure, arrival, passengers, date, email, phone } = req.body;

    // Check for missing fields
    if (!name || !type || !passengers || !departure || !arrival || !date || !email || !phone) {
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
      name,
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
    const { name,type, departure, arrival, passengers, date, email, phone } = req.body;

    if (!name ||!type || !passengers || !arrival || !departure || !date || !email || !phone) {
      return res.status(400).json({ message: "Fields to update are missing" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {name, type, departure, arrival, passengers, date, email, phone },
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
 * Log Details API Starts
 */

/**
 * Adding the Log details
 */
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

/**
 * Get all the Log Details
 */
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


/**
 * Enquiry Controllers
 */

exports.addEnquiry = async (req, res) => {
  try {
    const {
      enquiryname,
      enquiryemail,
      enquiryphone,
      enquirydate,
      enquirytype,
    } = req.body;

    // Check for missing fields
    if (
      !enquiryname ||
      !enquiryemail ||
      !enquiryphone ||
      !enquirydate ||
      !enquirytype
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const verificationResult = await email_verifier.verify_email(enquiryemail);
    if (!verificationResult.is_verified) {
      return res.status(400).json({
        message: "The email account that you tried to reach does not exist.",
      });
    }

    // Create a new booking
    const newEnquiry = new Enquiry({
      enquiryname,
      enquiryemail,
      enquiryphone,
      enquirydate,
      enquirytype,
    });

    // Save the booking
    await newEnquiry.save();

    return res
      .status(200)
      .json({ message: "Enquiry data inserted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

/** Delete Enquiry Booking */
exports.deleteEnquiryById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Data not found" });
    }

    await Enquiry.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
/**
 * Get All Enquiries
 */


exports.getAllEnquiry = async (req, res) => {
  try {
    const response = await Enquiry.find({});
    
    if (response.length === 0) {
      return res.status(404).json({ message: "No Enquiries found" });
    }
    
    return res.status(200).json({
      message: "All Enquiries Fetched",
      data: response
    });
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Filter flights by type and category
 */
exports.filterByTypeAndCategory = async (req, res) => {
  try {
    const { section, chartertype } = req.params;

    // Check if required parameters are present
    if (!section || !chartertype) {
      return res.status(400).json({ message: "Required parameters 'section' or 'chartertype' are missing." });
    }

    // Query to find the data
    const data = await Subcategory.find({ section, chartertype });

    // Check if data is found
    if (!data) {
      return res.status(404).json({ message: "No subcategories found matching the provided section and charter type." });
    }

    // Return success response with data
    return res.status(200).json({
      message: "Subcategories fetched successfully.",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);
    return res.status(500).json({ message: "An error occurred while fetching subcategories.", error: error.message });
  }
};



// async function insertDynamicSubcategoryData() {
//   try {
//       const subcategories = [];

//       for (let i = 0; i < 30; i++) {
//           const date = new Date();
//           const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`; // Format date as dd-mm-yyyy

//           subcategories.push({
//               chartertype: `Type B`,
//               subCategoryName: `Subcategory ${i + 1}`,
//               pax: `${Math.floor(Math.random() * 100)}`,
//               speed: `${Math.floor(Math.random() * 1000)} km/h`,
//               price: `${Math.floor(Math.random() * 10000)}`,
//               description: `Description for subcategory ${i + 1}`,
//               image: `image${i + 1}.jpg`,
//               availability: Math.random() > 0.5 ? 'yes' : 'no',
//               bookingtype: `Type ${Math.floor(Math.random() * 10)}`,
//               departure: `City ${Math.floor(Math.random() * 10)}`,
//               arrival: `City ${Math.floor(Math.random() * 10)}`,
//               journeytype: `Journey ${Math.floor(Math.random() * 5)}`,
//               date: formattedDate, // Use the formatted date in dd-mm-yyyy format
//               yom: `${2024}`,
//               seats: `${Math.floor(Math.random() * 20)}`,
//               crew: `${Math.floor(Math.random() * 10)}`,
//               airhosts: `${Math.floor(Math.random() * 10)}`,
//               levatory: `${Math.floor(Math.random() * 5)}`,
//               fromtime: `00:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
//               endtime: `23:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
//               flyingrange: `${Math.floor(Math.random() * 5000)} km`,
//               cabinwidth: `${Math.random() * 10}`,
//               cabinheight: `${Math.random() * 10}`,
//               baggage: `${Math.floor(Math.random() * 100)} kg`,
//               cabinlength: `${Math.random() * 20}`,
//               pilot: `Pilot ${i + 1}`,
//               discount: `${Math.floor(Math.random() * 50)}`,
//               discountprice: `${Math.floor(Math.random() * 5000)}`,
//               image:`https://res.cloudinary.com/dybrajkta/image/upload/v1724732849/eowmbrasulcliihtyafb.jpg`
//           });
//       }

//       await Subcategory.insertMany(subcategories);
//       console.log('100 subcategories with Type B inserted successfully');
//   } catch (error) {
//       console.log('Error inserting subcategories:', error);
//   }
// }

// Example usage
// insertDynamicSubcategoryData();

/**
 * Function to insert multiple Categorymodify documents.
 * @param {number} count - The number of documents to insert.
 */
// async function insertDynamicCategoryModifyData(count) {
//   try {
//       const categorymodifies = [];
//       const sections = ['Charters Flight']; // Only one section for now
//       const charterTypes = ['Type A', 'Type B', 'Type C', 'Type D', 'Type E']; // Add more as needed

//       for (let i = 0; i < count; i++) {
//           categorymodifies.push({
//               section: sections[0],
//               chartertype: charterTypes[i % charterTypes.length], // Cycle through the types
//               description: `Description for type ${i + 1}`,
//               image: `https://res.cloudinary.com/dybrajkta/image/upload/v1724960398/qtvybcnrhctkq2csao9q.jpg`
//           });
//       }

//       await Categorymodify.insertMany(categorymodifies);
//       console.log(`${count} Categorymodify documents inserted successfully`);
//   } catch (error) {
//       console.log('Error inserting Categorymodify documents:', error);
//   }
// }

// // Example usage
// insertDynamicCategoryModifyData(100); // Insert 100 documents



/**
 * Function to insert multiple Type documents.
 * @param {number} count - The number of types to insert.
 */
// async function insertDynamicTypeData(count) {
//   try {
//       const types = [];

//       for (let i = 0; i < count; i++) {
//           types.push({
//               section: `Section ${i + 1}`,
//               active: Math.random() > 0.5 ? 'yes' : 'no'
//           });
//       }

//       await Type.insertMany(types);
//       console.log(`${count} types inserted successfully`);
//   } catch (error) {
//       console.log('Error inserting types:', error);
//   }
// }

// // Example usage
// insertDynamicTypeData(100); // Insert 100 types


