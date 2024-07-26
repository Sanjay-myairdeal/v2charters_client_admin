const admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({ message: "Mising Fields" });
    }
    const existed = await admin.findOne({ email });
    if (existed) {
      res.status(409).json({ message: "User already existed" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new admin({
      email,
      password: hashed,
    });
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin created Successfully", details: newAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * Login the admin
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const data = await admin.findOne({ email });
    if (!data) {
      return res.status(404).json({ message: "Invalid User Email" });
    }

    const checkedPassword = await bcrypt.compare(password, data.password);
    if (!checkedPassword) {
      return res.status(401).json({ message: "Password Not Matching" });
    }

    res
      .status(200)
      .json({ message: "Admin Logged in Successfully", details: data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**Delete the Admin */
exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    const data = await admin.findById(id );
    if (!data) {
      return res.status(404).json({ message: "User not found with this ID" });
    }
    await admin.findByIdAndDelete(id);
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
