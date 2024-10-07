const express = require("express");
const router = express.Router();
const categoryController = require('../adminController/categoryController');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

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

router.get("/modifycategory", categoryController.getModifyCategories);
router.post("/addmodifycategory", upload.single("image"), categoryController.addModifyCategories);
router.put("/editmodifycharterbyid/:id", upload.single("image"), categoryController.editModifyCharterById);
router.delete("/deletemodifycharterbyid/:id", categoryController.deleteModifyCharterById);

module.exports = router;
