const express=require("express");
const router=express.Router();
const multer  = require('multer')
const adminController=require('../adminController/adminController');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
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
router.get('/', adminController.getPage);
router.post('/upload', upload.single('file'), adminController.getPagePost);  
router.get('/getallcategories',adminController.getAllCategories);
router.post('/addchartercategory',upload.single('image'),adminController.addCharterCategory);
router.get('/getcharterbyid/:id',adminController.getCharterById);
router.put("/editcharterbyid/:id",upload.single('image'), adminController.editCharterById);
router.delete("/deletecharterbyid/:id",adminController.deleteCharterById);



/** Booking Section Routes Starts */
router.get('/getallbookings',adminController.getAllBookings);
router.post('/addbooking',adminController.addBooking);
router.get('/sorted',adminController.filterDate)
module.exports=router;