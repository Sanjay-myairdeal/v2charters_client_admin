const Category = require("../models/Category");
const Booking = require("../models/Booking");
const cloudinary = require("cloudinary").v2;
const Emptylegs = require("../models/Emptylegs");
const Emptylegbooking=require('../models/EmptylegsBooking')
// Cloudinary configuration
cloudinary.config({
  cloud_name: "dybrajkta",
  api_key: "921983243972892",
  api_secret: "c4n72FykTGrxsKpDzpADvNsqf5U",
});
/**
 * Category Section Starts
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
    const { type, passengers, speed, price, description,availability } = req.body;

    if (!type || !passengers || !speed || !price || !description || !availability) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    const newCategory = new Category({
      type,
      passengers,
      speed,
      price,
      description,
      image: result.secure_url,
      availability
    });

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
    const { type, passengers, speed, price, description , availability } = req.body;

    if (
      !id ||
      (!type && !passengers && !speed && !price && !description && !req.file && !availability)
    ) {
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

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { type, passengers, speed, price, description, image,availability },
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
/**Category section Ends */

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
      phone,
    });
    await newBooking.save();

    return res
      .status(200)
      .json({ message: "Booking data inserted successfully" });
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
/** Empty Legs Section Starts */
exports.getAllEmptyLegs = async (req, res) => {
  try {
    const data = await Emptylegs.find({});
    if (!data) {
      return res.status(404).json({ message: "Error in fetching the data" });
    }
    return res.status(200).json({ message: "Data fetched successfully", data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Adding the Empty Legs */
exports.addEmptyLegs = async (req, res) => {
  try {
    const { from, to, type, date, passengers, description, price,availability } = req.body;

    if (!type || !passengers || !to || !from || !date || !description || !price || !availability) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const image = req.file ? req.file.path : null;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    const newEmptyLeg = new Emptylegs({
      type,
      from,
      to,
      date,
      passengers,
      description,
      price,
      image: result.secure_url,
      availability
    });

    await newEmptyLeg.save();
    return res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Get the Empty Legs by Id */
exports.getEmptyLegById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is missing" });
    }
    const data = await Emptylegs.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found for the given ID" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Update Empty legs by ID */
exports.editEmptyLegsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Id is missing" });
    }
    const { from, to, type, date, passengers, description, price , availability} = req.body;
    if (!type || !passengers || !to || !from || !date || !description || !price || !availability) {
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

    const updatedData = await Emptylegs.findByIdAndUpdate(
      id,
      {
        from,
        to,
        type,
        date,
        passengers,
        description,
        price,
        image: image,
        availability
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(400).json({ message: "Error in updating the data" });
    }

    return res.status(200).json({ message: "Data updated successfully", updated: updatedData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/** Delete Empty Legs By Id */
exports.deleteEmptyLegsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Id is missing" });
    }

    const data = await Emptylegs.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found for the given ID" });
    }

    await Emptylegs.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


/**Empty Legs Boookings  starts here*/
exports.getAllEmptyBookings = async (req, res) => {
  try {
    const data = await Emptylegbooking.find({});
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


/** Add a Empty Leg Booking */
exports.addEmptyLegBooking = async (req, res) => {
  try {
    const { type, from, to, passengers, date, email, phone } = req.body;
    if (!type || !passengers || !to || !from || !date || !email || !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newBooking = new Emptylegbooking({
      type,
      from,
      to,
      passengers,
      date,
      email,
      phone,
    });
    await newBooking.save();

    return res
      .status(200)
      .json({ message: "Booking data inserted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};




/** Get a Empty Leg Booking by ID */
exports.getEmptylegBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Emptylegbooking.findById(id);

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
exports.editEmptyLegBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const { type, from, to, passengers, date, email, phone } = req.body;

    if (!type || !passengers || !to || !from || !date || !email || !phone) {
      return res.status(400).json({ message: "Fields to update are missing" });
    }

    const updatedBooking = await Emptylegbooking.findByIdAndUpdate(
      id,
      { type, from, to, passengers, date, email, phone },
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
exports.deleteEmptyLegBookingById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const booking = await Emptylegbooking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Data not found" });
    }

    await Emptylegbooking.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Date Filter
 */
exports.filterEmptyLegDate = async (req, res) => {
  try {
    const { from, to } = req.body;

    // Check if the from and to dates are provided
    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "From and To dates are required" });
    }

    const allBookings = await Emptylegbooking.find();

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