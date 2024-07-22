const Category = require("../models/Category");
//get Data
exports.home=async(req,res)=>{
    try {
        const data=await Category.find({})
        if(!data){
            res.status(404).json({message:"Error in fetching the Data"})
        }
        res.status(200).json({message:"Datafetched success",data})
    } catch (error) {
        res.status(400).json({message:"Server is not running"})
    }
}


//add data
exports.addData = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          message: "Missing Fields",
        });
      }
      const newData = new Category({
        name
      });
      await newData.save();
      return res.status(200).json({ message: "Data is Inserted Succesfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };

  //get mem with id
  exports.getmem = async (req, res) => {
    try {
      const id = req.params.id;
      const wholeData = await Category.findById(id);
      if (!wholeData) {
        return res.status(404).json({
          message: "Error in Fectching Data",
        });
      }
      return res.status(200).json(wholeData);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };
  //update data
 exports.updateData = async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      if (!id) {
        return res.status(400).json({
          message: "id is missing",
        });
      }
      const upDatat = await Category.findByIdAndUpdate(id, {
       name
      });
      if (!upDatat) {
        return res.status(404).json({ message: "Error in Data updateing" });
      }
      return res.status(200).json({ message: "Data is Updated", upDatat });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };

  //delete data
  exports.deleteData = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({
          message: "id is missing",
        });
      }
      const fetchId=await Category.findById(id);
      if(!fetchId){
        return res.status(404).json({ message: "Not found the data with Id" });
      }
      const upDatat = await Category.findByIdAndDelete(id);
      if (upDatat) {
        return res.status(200).json({ message: "Data is Deleted" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };