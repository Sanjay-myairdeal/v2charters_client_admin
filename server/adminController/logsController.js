const Log=require('../models/Log')
/**
 * Log Details API Starts
 */

/**
 * Adding the Log details
 */
exports.addLogDetails=async(req,res)=>{
    try {
      const {log}=req.body;
      if(!log){
       return res.status(404).json({message:"log details not captured"})
      }
    const logData=new Log({
      log:log
    })
    await logData.save();
    return res.status(200).json({message:"Log data recorded successfully"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Server is not running"})
    }
  }
  
  /**
   * Get all the Log Details
   */
  exports.getAllLogs = async (req, res) => {
    try {
      const response = await Log.find({});
      
      if (response.length === 0) {
        return res.status(404).json({ message: "No log details found" });
      }
      
      return res.status(200).json({
        message: "Log details fetched successfully",
        data: response
      });
    } catch (error) {
      console.error("Error fetching logs:", error.message);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  