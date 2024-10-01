const express = require("express");
const router = express.Router();
const onDemandSearch = require('../adminController/onDemand');

router.post('/demandsearch', onDemandSearch.onDemandSearch);

module.exports = router;
