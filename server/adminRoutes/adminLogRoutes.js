const express=require('express');
const router=express.Router();
const adminLogController=require('../adminController/adminlogsController')
router.get('/logs',adminLogController.getLogs);
module.exports=router