const express = require("express");
const router = express.Router();
const categoryController = require('../adminController/categoryController');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const { checkPermission } = require('../middleware/permissions');
const {verifyToken}=require('../middleware/loginmiddleware')
// Cloudinary configuration for image uploads
cloudinary.config({
  cloud_name: "dybrajkta",
  api_key: "921983243972892",
  api_secret: "c4n72FykTGrxsKpDzpADvNsqf5U",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      const supportedFormats = ["jpg", "jpeg", "png", "gif"];
      const fileFormat = file.mimetype.split("/")[1];
      return supportedFormats.includes(fileFormat) ? fileFormat : "jpg";
    },
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

// Routes with permission checks
router.get("/modifycategory", categoryController.getModifyCategories);

// Add category with 'canAdd' permission
router.post("/addmodifycategory",verifyToken, checkPermission('canAdd'), upload.single("image"), categoryController.addModifyCategories);

// Edit category with 'canEdit' permission
router.put("/editmodifycharterbyid/:id",verifyToken, checkPermission('canEdit'), upload.single("image"), categoryController.editModifyCharterById);

// Delete category with 'canDelete' permission
router.delete("/deletemodifycharterbyid/:id",verifyToken, checkPermission('canDelete'), categoryController.deleteModifyCharterById);

module.exports = router;
