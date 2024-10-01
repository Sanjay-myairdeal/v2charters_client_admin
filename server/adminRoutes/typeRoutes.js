const express = require("express");
const router = express.Router();
const typeController = require('../adminController/typeController');

/**
 * Types of Sections
 */
router.get('/getalltypes', typeController.getAllTypes);
router.post('/addsections', typeController.sectionAdding);
router.delete('/deletetype/:id', typeController.deleteTypeById);
router.put('/updatetype/:id', typeController.editTypeById);

module.exports = router;
