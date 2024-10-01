const express = require("express");
const router = express.Router();
const subCategoryController = require('../adminController/subCategoryController');
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

router.get("/getallsubcategories", subCategoryController.getSubCategories);
router.post("/addsubcategory", upload.single("image"), subCategoryController.addSubCategories);
router.post("/editmodifysubcharterbyid/:id", upload.single("image"), subCategoryController.editSubCategoryById);
router.delete("/deletemodifysubcharterbyid/:id", subCategoryController.deleteModifySubCharterById);

module.exports = router;
