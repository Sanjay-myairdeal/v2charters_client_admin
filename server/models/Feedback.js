const mongoose=require('mongoose');
const FeedbackSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Feedback',FeedbackSchema)