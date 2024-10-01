const express = require("express");
const router = express.Router();
const logsController = require('../adminController/logsController');

router.post('/addlogs', logsController.addLogDetails);
router.get('/getalllogs', logsController.getAllLogs);

module.exports = router;
