const Category = require("../models/Category");
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