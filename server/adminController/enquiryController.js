const Enquiry=require('../models/Enquiry')
const email_verifier = require("email-verifier-node");
/**
 * Enquiry Controllers
 */

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
   * Filter booking by Date
   */
  exports.filterEnquiryByDate = async (req, res) => {
    try {
      const { from, to } = req.body;
      // Check if the from and to dates are provided
      if (!from || !to) {
        return res
          .status(400)
          .json({ message: "From and To dates are required" });
      }
      const allBookings = await Enquiry.find();
      // Filter bookings within the date range
      const filteredData = allBookings.filter((item) => {
        return item.enquirydate >= from && item.enquirydate <= to;
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
  
  