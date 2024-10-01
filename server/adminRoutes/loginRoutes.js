const express = require("express");
const router = express.Router();
const loginController = require('../adminController/loginController');

router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.delete("/deleteadmin/:id", loginController.deleteAdmin);
router.get("/getalladmins", loginController.getAllAdmins);
router.put("/updateuserrolebyid/:id", loginController.editUserRole);
router.get("/getadminbyid/:id", loginController.getAdminById);

module.exports = router;
