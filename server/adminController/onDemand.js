const Subcategory = require('../models/Subcategory');

/**
 * On Demand Search API
 */
exports.onDemandSearch = async (req, res) => {
  try {
    const { from, to, date, pax, section } = req.body;

    // Validate required fields
    if (!from || !to || !date || !pax || !section) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    const paxNumber = Number(pax);
    // Search for subcategories matching the search criteria with pax less than the given value
    const subcategories = await Subcategory.find({
      isDeleted:false,
      section,
      from,
      to,
      date,
      pax: { $lte: paxNumber },
    }).select('-isDeleted -addedBy -__v');
    //  console.log("pax given by user",pax)
    // Check if results were found
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ message: "No Flights matching the given requirements" });
    }

    // Success response with data
    res.status(200).json({
      message: "Data Searched Successfully",
      data: subcategories
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
