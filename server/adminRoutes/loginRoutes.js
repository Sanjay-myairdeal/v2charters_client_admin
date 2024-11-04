const express = require("express");
const router = express.Router();
const loginController = require('../adminController/loginController');

router.post("/createuser", loginController.createUser);
router.post("/login", loginController.login);
router.delete("/deleteuserbyid/:id", loginController.deleteUser);
router.get("/getallusers", loginController.getAllUsers);
router.put("/updateuserbyid/:id", loginController.editUser);
router.get("/getuserbyid/:id", loginController.getUserById);
router.put("/toggleBlockUser/:id", loginController.toggleBlockUser);

module.exports = router;
