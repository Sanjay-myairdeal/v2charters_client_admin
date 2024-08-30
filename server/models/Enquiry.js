const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    enquiryname: {
        type: String,
        required: true
    },
    enquiryemail: {
        type: String,
        required: true
    },
    enquiryphone: {
        type: String,
        required: true
    },
    enquirytype: {
        type: String,
        required: true
    },
    enquirydate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
