const viewController=require('../adminController/viewsController');
const express=require('express');
const router=express.Router();
router.get('/viewone/:id',viewController.viewData)
module.exports=router 