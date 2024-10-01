const express = require("express");
const router = express.Router();
const enquiryController = require('../adminController/enquiryController');

/**
 * Enquiry Routes
 */
router.post('/addenquiry', enquiryController.addEnquiry);
router.delete('/deleteenquirybyid/:id', enquiryController.deleteEnquiryById);
router.get('/getallenquiry', enquiryController.getAllEnquiry);
router.post('/filterenquirybydate', enquiryController.filterEnquiryByDate);

module.exports = router;
