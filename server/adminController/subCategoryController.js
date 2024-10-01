const Subcategory = require("../models/Subcategory");
const cloudinary=require("../cloudinary/cloudinary");
const FlightDetails=require('../models/FlightDetails')
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
   * Add Subcategory data
   */
  
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

 