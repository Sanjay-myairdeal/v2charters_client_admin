const Category = require("../models/Category");
const Booking=require("../models/Booking");
/**
 * Category 
 * Section 
 * Starts
 */

/** Get All Categories */
exports.getAllCategories = async (req, res) => {
  try {
    const data = await Category.find({});
    if (!data) {
      return res.status(404).json({ message: "Error in fetching the data" });
    }
    return res.status(200).json({ message: "Data fetched successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/** Add a Category */
exports.addCharterCategory = async (req, res) => {
  try {
    const { type, passengers, speed, price, description } = req.body;
    if (!type || !passengers || !speed || !price || !description) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newCategory = new Category({ type, passengers, speed, price, description });
    await newCategory.save();

    return res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Get a Category by ID */
exports.getCharterById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Update a Category by ID */
exports.editCharterById = async (req, res) => {
  try {
    const id = req.params.id;
    const { type, passengers, speed, price, description } = req.body;

    if (!id || (!type && !passengers && !speed && !price && !description)) {
      return res.status(400).json({ message: "ID or fields to update are missing" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { type, passengers, speed, price, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Error in updating data" });
    }
    return res.status(200).json({ message: "Data updated successfully", updatedCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Delete a Category by ID */
exports.deleteCharterById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Data not found" });
    }

    await Category.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
/**Booking Section End */

/**Booking Section Starts */


/** Get All Bookings */
exports.getAllBookings = async (req, res) => {
    try {
      const data = await Booking.find({});
      if (!data) {
        return res.status(404).json({ message: "Error in fetching the Booking data" });
      }
      return res.status(200).json({ message: "Data fetched successfully", data });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  /** Add a Booking */
  exports.addBooking = async (req, res) => {
    try {
      const { type, from, to, passengers, date, email, phone } = req.body;
      if (!type || !passengers || !to || !from || !date || !email || !phone) {
        return res.status(400).json({ message: "Missing fields" });
      }
  
      const newBooking = new Booking({ 
        type,
        from,
        to,
        passengers,
        date,
        email,
        phone
      });
      await newBooking.save();
  
      return res.status(200).json({ message: "Booking data inserted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
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
      const { type, from, to, passengers, date, email, phone } = req.body;
  
      if (!type || !passengers || !to || !from || !date || !email || !phone) {
        return res.status(400).json({ message: "Fields to update are missing" });
      }
  
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { type, from, to, passengers, date, email, phone },
        { new: true }
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ message: "Error in updating data" });
      }
      return res.status(200).json({ message: "Data updated successfully", updatedBooking });
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