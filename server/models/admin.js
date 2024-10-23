const mongoose = require('mongoose');
const AdminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the UserRole object
        ref: 'UserRole',  // Reference to the UserRole model
        required: true
    }
})
module.exports=mongoose.model('admin',AdminSchema);