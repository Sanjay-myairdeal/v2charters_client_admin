const Subcategory = require("../models/Subcategory");
const cloudinary = require("cloudinary").v2;
const Logs=require('../models/Logs')
/**
 *  Cloudinary configuration
 */
cloudinary.config({
  cloud_name: "dybrajkta",
  api_key: "921983243972892",
  api_secret: "c4n72FykTGrxsKpDzpADvNsqf5U",
});
/**
 * Get Sub Category Data
 */
exports.getSubCategories = async (req, res) => {
    try {
      const data = await Subcategory.find({}).populate({
        path:'addedBy',
        select:'-password -__v',
        populate:{
          path:'role',
          select:'-password -__v -permissions'
        }
      });
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
        from,
        section,
        to,
        chartertype,
        categoryName,
        subCategoryName,
        description,
        date,
        pax,
        availability,
        addedBy,
        price,
        airhosts,
        fromtime,
        endtime,
        discount,
        duration,
        reachdate,
        targetprice,
        brokercompany,
        brokerName,
        brokerEmail,
        brokerPhone,
        operatoremail,
        operatorname,
        operatorphone,
      } = req.body;

      const image = req.file ? req.file.path : null;
      const caldiscount = (discount / 100) * price;

      if (!image) {
        return res.status(400).json({ message: "Image file is required" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image);
      const userId = req.userId; 
     // console.log(userId)
      // Create flight details object
      const flightDetails = new Subcategory({
        from,
        section,
        to,
        chartertype,
        categoryName,
        subCategoryName,
        description,
        date,
        pax,
        availability,
        addedBy,
        price,
        airhosts,
        fromtime,
        endtime,
        discount,
        discountprice:caldiscount,
        duration,
        reachdate,
        targetprice,
        brokercompany,
        brokerName,
        brokerEmail,
        brokerPhone,
        operatoremail,
        operatorname,
        operatorphone,
        image:result.secure_url,
        addedBy:userId
      });

      // Save flight details to the database
      await flightDetails.save();
      // console.log(flightDetails)
      const logs=new Logs({
        userId:userId,
        action:'add',
        targetType:'Subcategory',
        targetId:flightDetails._id,
        tagetData:flightDetails
      }) 
      await logs.save();
      return res
        .status(200)
        .json({ message: "Subcategory data Inserted ", data: flightDetails });
    } catch (error) {
      console.error("Error adding subcategory:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  // exports.addSubCategories = async (req, res) => {
  //   try {
  //     const {
  //       from,
  //       section,
  //       to,
  //       chartertype,
  //       categoryName,
  //       subCategoryName,
  //       description,
  //       date,
  //       pax,
  //       availability,
  //       price,
  //       airhosts,
  //       fromtime,
  //       endtime,
  //       discount,
  //       duration,
  //       reachdate,
  //       targetprice,
  //       brokercompany,
  //       brokerName,
  //       brokerEmail,
  //       brokerPhone,
  //       operatoremail,
  //       operatorname,
  //       operatorphone,
  //     } = req.body;
  
  //     const image = req.file ? req.file.path : null;
  
  //     if (!image) {
  //       return res.status(400).json({ message: "Image file is required" });
  //     }
  
  //     // Upload image to Cloudinary
  //     const result = await cloudinary.uploader.upload(image);
  //     const userId = req.userId; 
  
  //     // Calculate discount and discounted price
  //     const caldiscount = (discount / 100) * price; // Calculate the amount of discount
  //     const discountedPrice = price - caldiscount; // Calculate the final price after discount
  
  //     // Create flight details object
  //     const flightDetails = new Subcategory({
  //       from,
  //       section,
  //       to,
  //       chartertype,
  //       categoryName,
  //       subCategoryName,
  //       description,
  //       date,
  //       pax,
  //       availability,
  //       price,
  //       airhosts,
  //       fromtime,
  //       endtime,
  //       discount,
  //       discountprice: discountedPrice, // Store the final discounted price
  //       duration,
  //       reachdate,
  //       targetprice,
  //       brokercompany,
  //       brokerName,
  //       brokerEmail,
  //       brokerPhone,
  //       operatoremail,
  //       operatorname,
  //       operatorphone,
  //       image: result.secure_url,
  //       addedBy: userId
  //     });
  
  //     // Save flight details to the database
  //     await flightDetails.save();
  
  //     return res
  //       .status(200)
  //       .json({ message: "Subcategory data Inserted ", data: flightDetails });
  //   } catch (error) {
  //     console.error("Error adding subcategory:", error);
  //     return res.status(500).json({ message: "Server error" });
  //   }
  // };
  
  
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
        from,
        section,
        to,
        chartertype,
        categoryName,
        subCategoryName,
        description,
        date,
        pax,
        availability,
        addedBy,
        price,
        airhosts,
        fromtime,
        endtime,
        discount,
        discountprice,
        duration,
        reachdate,
        targetprice,
        brokercompany,
        brokerName,
        brokerEmail,
        brokerPhone,
        operatoremail,
        operatorname,
        operatorphone,
      } = req.body;

      let image;
      const caldiscount = (discount / 100) * price;
      if (req.file) {
        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
      } else {
        image = req.body.image;
      }
      const userId = req.userId; 
      const updatedData = await Subcategory.findByIdAndUpdate(
        id,
        {
          from,
          to,
          section,
          chartertype,
          categoryName,
          subCategoryName,
          description,
          date,
          pax,
          availability,
          addedBy:userId,
          price,
          airhosts,
          fromtime,
          endtime,
          discount,
          discountprice,
          duration,
          reachdate,
          targetprice,
          brokercompany,
          brokerName,
          brokerEmail,
          brokerPhone,
          operatoremail,
          operatorname,
          operatorphone,
        },
        { new: true }
      );

      if (!updatedData) {
        return res.status(400).json({ message: "Error in updating the data" });
      }
      const logs=new Logs({
        userId:userId,
        action:'edit',
        targetType:'Subcategory',
        targetId:updatedData._id,
        targetData:updatedData
      }) 
      await logs.save();
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
      const logs=new Logs({
        userId:userId,
        action:'delete',
        targetType:'Subcategory',
        targetId:category._id,
        targetData:category
      }) 
      await logs.save();
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
  
      const filteredSubCategory = await Subcategory.find({ _id: subcategoryId }).populate({
        path:'addedBy',
        select:'-password -__v',
        populate:{
          path:'role',
          select:'-password -__v -permissions'
        }
      });
  
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

 