const express=require("express");
const router=express.Router();
const adminController=require('../adminController/adminController');

/** Category Section Routes Starts */
router.get('/getallcategories',adminController.getAllCategories);
router.post('/addchartercategory',adminController.addCharterCategory);
router.get('/getcharterbyid/:id',adminController.getCharterById);
router.put("/editcharterbyid/:id", adminController.editCharterById);
router.delete("/deletecharterbyid/:id",adminController.deleteCharterById);



/** Booking Section Routes Starts */
router.get('/getallbookings',adminController.getAllBookings);
router.post('/addbooking',adminController.addBooking);
module.exports=router;