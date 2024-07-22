const mongoose = require('mongoose');
const categorySchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    passengers:{
        type:String,
        required:true
    },
    speed:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:'This file is required.'
    },
});

module.exports= mongoose.model('Category',categorySchema);