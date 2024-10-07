const express = require("express");
const router = express.Router();
const filterController = require('../adminController/filter');

/**
 * Filter Category Data
 */
router.get("/:chartertype", filterController.getsubCategorybyCategory);
router.get('/categorybytype/:type', filterController.filterByType);

/**
 * Filter data based on Type and Category
 */
router.post('/filterbytypeandcategory/:section/:chartertype', filterController.filterByTypeAndCategory);

router.post('/filterSubCategoryByType/:type', filterController.filterSubCategoryByType);

module.exports = router;
