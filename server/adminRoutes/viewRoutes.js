const viewController=require('../adminController/viewsController');
const express=require('express');
const router=express.Router();
router.get('/viewone/:id',viewController.viewData);
router.get('/viewall',viewController.viewAllData)
module.exports=router 