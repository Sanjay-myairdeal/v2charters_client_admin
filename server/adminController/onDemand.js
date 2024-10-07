const Subcategory=require('../models/Subcategory')
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