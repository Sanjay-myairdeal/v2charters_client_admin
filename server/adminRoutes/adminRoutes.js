const express = require("express");
const router = express.Router();
const FlightDetails=require('../adminController/flightDetailsController');
const bookingController=require('../adminController/bookingController')
const categoryController=require('../adminController/categoryController');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const loginController=require('../adminController/loginController');
const logsController=require('../adminController/logsController')
const filterController=require('../adminController/filter')
const onDemandSearch=require('../adminController/onDemand')
const subCategoryController=require('../adminController/subCategoryController')
const typeController=require('../adminController/typeController')

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dybrajkta",
    api_key: "921983243972892",
    api_secret: "c4n72FykTGrxsKpDzpADvNsqf5U",
  });
  // Multer configuration
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads",
      format: async (req, file) => {
        const supportedFormats = ["jpg", "jpeg", "png", "gif"];
        const fileFormat = file.mimetype.split("/")[1];
  
        return supportedFormats.includes(fileFormat) ? fileFormat : "jpg";
      },
      public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
  });
  
  const upload = multer({
    storage: storage,
  });


/** Modify Booking Section Routes Starts */
router.get("/getallbookings", bookingController.getAllBookings);
router.post("/addbooking", bookingController.addBooking);
router.post("/sorted", bookingController.filterDate);
router.delete("/deletebookingbyid/:id", bookingController.deleteBookingById);




/**
 * Routes of Modify Schema
 */
router.get("/modifycategory", categoryController.getModifyCategories);
router.post(
  "/addmodifycategory",
  upload.single("image"),
  categoryController.addModifyCategories
);
router.post(
  "/editmodifycharterbyid/:id",
  upload.single("image"),
  categoryController.editModifyCharterById
);
router.delete(
  "/deletemodifycharterbyid/:id",
  categoryController.deleteModifyCharterById
);
const enquiryController=require('../adminController/enquiryController')

/**
 * Enquiry Routs
 */
router.post('/addenquiry',enquiryController.addEnquiry)
router.delete('/deleteenquirybyid/:id',enquiryController.deleteEnquiryById)
router.get('/getallenquiry',enquiryController.getAllEnquiry)
router.post('/filterenquirybydate',enquiryController.filterEnquiryByDate)


/**
 * Filter Category Data
 */
router.get("/filter/:chartertype", filterController.getsubCategorybyCategory);
router.get('/categorybytype/:type',filterController.filterByType)


/**
 * Filter data based on Type and Category
 */
router.post('/filterbytypeandcategory/:section/:chartertype',filterController.filterByTypeAndCategory)

router.post('/filterSubCategoryByType/:type',filterController.filterSubCategoryByType)



/**Register and Login Routes */
router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.delete("/deleteadmin/:id", loginController.deleteAdmin);
router.get('/getalladmins',loginController.getAllAdmins)
router.put('/updateuserrolebyid/:id',loginController.editUserRole)
router.get('/getadminbyid/:id',loginController.getAdminById)

/**
 * Routes for log details
 */
router.post('/addlogs',logsController.addLogDetails)
router.get('/getalllogs',logsController.getAllLogs)

/**On Demand Search api */
router.post('/demandsearch',onDemandSearch.onDemandSearch)


/**
 * Sub Categories Routes
 */
router.get("/getallsubcategories", subCategoryController.getSubCategories);
router.post(
  "/addsubcategory",
  upload.single("image"),
  subCategoryController.addSubCategories
);
router.post(
  "/editmodifysubcharterbyid/:id",
  upload.single("image"),
  subCategoryController.editSubCategoryById
);
router.delete(
  "/deletemodifysubcharterbyid/:id",
  subCategoryController.deleteModifySubCharterById
);


/**
 * Types of Sections
 */
router.get('/getalltypes',typeController.getAllTypes)
router.post('/addsections',typeController.sectionAdding)
router.delete('/deletetype/:id',typeController.deleteTypeById)
router.put('/updatetype/:id',typeController.editTypeById)