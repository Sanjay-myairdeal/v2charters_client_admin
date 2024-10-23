const express = require("express");
const router = express.Router();
const typeController = require('../adminController/typeController');
const {checkPermission}=require('../middleware/permissions');
const {verifyToken}=require('../middleware/loginmiddleware')
/**
 * Types of Sections
 */
router.get('/getalltypes', typeController.getAllTypes);
router.post('/addsections',verifyToken,checkPermission('canAdd'), typeController.sectionAdding);
router.delete('/deletetype/:id',verifyToken,checkPermission('canDelete'), typeController.deleteTypeById);
router.put('/updatetype/:id',verifyToken,checkPermission('canEdit'), typeController.editTypeById);

module.exports = router;
