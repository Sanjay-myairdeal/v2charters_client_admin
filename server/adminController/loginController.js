/**
 * User Roles ontrollers
 */

const admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

/**
 * Register a new admin
 */
exports.register = async (req, res) => {
  try {
    const { email, password, role ,name} = req.body;

    // Check if all fields are provided
    if (!email || !password || !role || !name) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    // Check if the user already exists
    const existed = await admin.findOne({ email });
    if (existed) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new admin({
      email,
      password: hashedPassword,
      role,
      name
    });

    await newAdmin.save();

    // Exclude password and __v from the response
    const userData = await admin.findById(newAdmin._id).select("-password -__v");

    return res.status(201).json({
      message: "User created successfully",
      details: userData,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Login the admin
 */
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    // Check if the user exists
    const data = await admin.findOne({ email });
    if (!data) {
      return res.status(404).json({ message: "Invalid User Email" });
    }

    // Check password
    const checkedPassword = await bcrypt.compare(password, data.password);
    if (!checkedPassword) {
      return res.status(401).json({ message: "Password Not Matching" });
    }

    // Validate role and name
    if (role !== data.role ) {
      return res.status(401).json({ message: "No user with particular role or name" });
    }

    // Exclude password and __v from the response
    const loginData = await admin.findOne({ email }).select("-password -__v");

    return res.status(200).json({
      message: " Logged in Successfully",
      details: loginData,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Delete the Admin
 */
exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id is provided
    if (!id) {
      return res.status(400).json({ message: "Missing ID Field" });
    }

    // Validate the id format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Check if the admin exists
    const data = await admin.findById(id);
    if (!data) {
      return res.status(404).json({ message: "User not found with this ID" });
    }

    // Delete the admin
    await admin.findByIdAndDelete(id);
    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error during deletion:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Get All Admins
 */
exports.getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins and exclude password and __v
    const adminData = await admin.find({}).select("-password -__v");

    // Check if admin data exists
    if (adminData.length === 0) {
      return res.status(404).json({ message: "No Admin Data" });
    }

    return res.status(200).json({
      message: "Admins data fetched successfully",
      data: adminData,
    });
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



/**
 * Edit the User Role
 */

exports.editUserRole = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID is missing" });
    }

    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const userData = await admin.findById(id);
    
    if (!userData) {
      return res.status(404).json({ message: "User data not found" });
    }

    // Hash the password before updating it
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedData = await admin.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword, role },
      { new: true }
    );

    if (!updatedData) {
      return res.status(400).json({ message: "Error updating the data" });
    }

    return res.status(200).json({ message: "Data updated successfully", data: updatedData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


/**
 * Get admin by Id
 */
exports.getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "id is not Found" });
    }
    const foundData = await admin.findById(id).select("-password -__v");
    if (!foundData) {
      return res.status(400).json({ message: "data not fount" });
    }
    return res
      .status(200)
      .json({ message: "data fetched successfully", data: foundData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};