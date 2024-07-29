const express=require("express");
const router=express.Router();
const multer  = require('multer')
const adminController=require('../adminController/adminController');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const loginController=require('../adminController/loginController')
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
      folder: 'uploads', 
      format: async (req, file) => {
        const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
        const fileFormat = file.mimetype.split('/')[1];

        return supportedFormats.includes(fileFormat) ? fileFormat : 'jpg';
      },
      public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
  });



const upload = multer({ 
    storage: storage,
    
});
/** Category Section Routes Starts */


router.get('/getallcategories',adminController.getAllCategories);
router.post('/addchartercategory',upload.single('image'),adminController.addCharterCategory);
router.get('/getcharterbyid/:id',adminController.getCharterById);
router.put("/editcharterbyid/:id",upload.single('image'), adminController.editCharterById);
router.delete("/deletecharterbyid/:id",adminController.deleteCharterById);



/** Booking Section Routes Starts */
router.get('/getallbookings',adminController.getAllBookings);
router.post('/addbooking',adminController.addBooking);
router.post('/sorted',adminController.filterDate);
router.delete('/deletebookingbyid/:id',adminController.deleteBookingById);




/** Empty legs Section Starts */
router.get('/getallemptylegs',adminController.getAllEmptyLegs);
router.post('/addemptylegs',upload.single('image'),adminController.addEmptyLegs);
router.get("/getemptylegsbyid/:id", adminController.getEmptyLegById);
router.put('/editemptylegsbyid/:id',upload.single('image'),adminController.editEmptyLegsById);
router.delete('/deleteemptylegsbyid/:id',adminController.deleteEmptyLegsById);


/** Empty Leg Booking Routes */


router.get('/getallemptylegbookings',adminController.getAllEmptyBookings);
router.post('/addemptylegbooking',adminController.addEmptyLegBooking);
router.get("/getemptylegbookingbyid/:id", adminController.getEmptylegBookingById);
router.post('/filteremptylegbooking',adminController.filterEmptyLegDate);
router.delete('/deleteemptylegbookingbyid/:id',adminController.deleteEmptyLegBookingById);

/**Register and Login Routes */
router.post('/register',loginController.register);
router.post('/login',loginController.login);
router.delete('/deleteadmin/:id',loginController.deleteAdmin);


/** Feedback Section */
router.post('/addfeedback',adminController.addFeedback);
router.get('/getallfeedback',adminController.getAllFeedbacks)
router.delete('/deletefeedbackbyid/:id',adminController.deleteFeedbackById)
module.exports=router;