const express=require("express");
const router=express.Router();
const adminController=require('../adminController/adminController');
router.get('/home',adminController.home);
router.post('/add',adminController.addData)
module.exports=router;