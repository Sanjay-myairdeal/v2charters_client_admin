const express=require("express");
const router=express.Router();
const multer  = require('multer')
const adminController=require('../adminController/adminController');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', false));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});
/** Category Section Routes Starts */
router.get('/', adminController.getPage);
router.post('/upload', upload.single('file'), adminController.getPagePost);
router.get('/getallcategories',adminController.getAllCategories);
router.post('/addchartercategory',adminController.addCharterCategory);
router.get('/getcharterbyid/:id',adminController.getCharterById);
router.put("/editcharterbyid/:id", adminController.editCharterById);
router.delete("/deletecharterbyid/:id",adminController.deleteCharterById);



/** Booking Section Routes Starts */
router.get('/getallbookings',adminController.getAllBookings);
router.post('/addbooking',adminController.addBooking);
module.exports=router;