const express=require("express");
const router=express.Router();
const adminController=require('../adminController/adminController');
router.get('/home',adminController.home);
router.post('/add',adminController.addData);
router.get('/getmem/:id',adminController.getmem);
router.put("/update/:id", adminController.updateData);
router.delete("/delete/:id",adminController.deleteData);
module.exports=router;