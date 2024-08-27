const admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const existed = await admin.findOne({ email });
    if (existed) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    const userData = await admin.findById(newAdmin._id).select("-password -__v");

    return res.status(201).json({
      message: "Admin created successfully",
      details: userData
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const data = await admin.findOne({ email });
    const loginData=await admin.findOne({email}).select("-password -__v")
    if (!data) {
      return res.status(404).json({ message: "Invalid User Email" });
    }

    const checkedPassword = await bcrypt.compare(password, data.password);
    if (!checkedPassword) {
      return res.status(401).json({ message: "Password Not Matching" });
    }

    res
      .status(200)
      .json({ message: "Admin Logged in Successfully", details: loginData });
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

/**
 * Get All Admins
 */
exports.getAllAdmins=async(req,res)=>{
  try {
    const adminData=await admin.find({}).select("-password -__v")
    if(!adminData){
      return res.status(400).json({ message: "No Admin Data" });
    }
    res.status(200).json({message:"admins data fetched successfully",data:adminData})
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}