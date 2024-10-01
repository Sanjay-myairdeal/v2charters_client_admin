const Booking = require("../models/Booking");
const email_verifier = require("email-verifier-node");
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
  