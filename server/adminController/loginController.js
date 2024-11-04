/**
 * User Roles controllers
 */
const admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const jwt_secret=process.env.JWT_SECRET
// console.log(jwt_secret)
/**
 * Register a new admin
 */
exports.createUser = async (req, res) => {
  try {
    const { email, password, role ,name} = req.body;

    // Check if all fields are provided
    if (!email || !password || !role || !name ) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    // Check if the user already exists
    const existed = await admin.findOne({ email,role });
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
 
    // Validate role: compare ObjectIds
    if (!mongoose.Types.ObjectId.isValid(role)) {
      return res.status(400).json({ message: "Invalid Role ID format" });
    }

    if (!data.role.equals(role)) {
      return res.status(401).json({ message: "No user with particular role or role mismatch" });
    }

if (data.isBlocked) {
  return res.status(403).json({ message: "User is blocked. Access denied." });
}
    // Exclude password and __v from the response
    const loginData = await admin.findOne({ email }).select("-password -__v");
    const token=jwt.sign({userId:loginData._id},jwt_secret,{expiresIn:"1h"})

    return res.status(200).json({
      message: "Logged in Successfully",
      token,
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
exports.deleteUser = async (req, res) => {
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
      return res.status(404).json({ message: "User not found with this ID"});
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
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all admins and exclude password and __v
    const adminData = await admin.find({}).populate('role').select("-password -__v");

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

exports.editUser = async (req, res) => {
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

    // Update the user data
    await admin.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword, role },
      { new: true }
    );

    // Fetch the updated data again to exclude password and __v fields
    const finalData = await admin.findById(id).select("-password -__v");

    return res.status(200).json({ message: "Data updated successfully", data: finalData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


/**
 * Get admin by Id
 */
exports.getUserById = async (req, res) => {
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

exports.toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format" });

    const updatedUser = await admin.findByIdAndUpdate(id, { isBlocked }, { new: true }).select("-password -__v");
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: `User has been ${isBlocked ? "blocked" : "unblocked"} successfully`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating block status:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
