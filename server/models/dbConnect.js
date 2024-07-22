const mongoose = require('mongoose')
const dbConnect=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(
            ()=>{
                console.log("Db connected Sucessfully");
            }
        )
    } catch (error) {
        console.log(error)
    }
}
module.exports=dbConnect