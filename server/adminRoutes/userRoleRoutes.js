const userRoleController=require('../adminController/userRoleController');
const express=require('express')
const router=express.Router();
router.get('/getalluserroles',userRoleController.getUserRoles);
router.post('/adduserrole',userRoleController.addUserRole);
router.put('/updateuserrolebyid/:id',userRoleController.editUserRolePermissionsById);
router.delete('/deleteuserrolebyid/:id',userRoleController.deleteUserRoleByID)
module.exports=router