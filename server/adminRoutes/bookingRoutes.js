const express = require("express");
const router = express.Router();
const bookingController = require('../adminController/bookingController');

router.get("/getallbookings", bookingController.getAllBookings);
router.post("/addbooking", bookingController.addBooking);
router.post("/sorted", bookingController.filterDate);
router.delete("/deletebookingbyid/:id", bookingController.deleteBookingById);

module.exports = router;
