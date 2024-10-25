const Log=require('../models/Logs')
exports.getLogs = async (req, res) => {
    try {
      const logs = await Log.find({}).populate({
        path:'userId',
        select:'-password -__v',
      }).populate({
        path: 'targetId', // Adjust based on the field name in your schema
        select: '-__v' // Select the fields you want to exclude/include
      });;
      res.status(200).json({ message: "Logs fetched successfully", data: logs });
    } catch (error) {
      res.status(500).json({ message: "Error fetching logs" });
    }
  };
  