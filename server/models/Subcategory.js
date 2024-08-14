const mongoose=require('mongoose');
const SubcategorySchema=mongoose.Schema({
    chartertype:{
        type:String,
        required:true
    },
    subCategoryName:{
        type:String,
        required:true
    },
    pax:{
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
    availability: {
        type: String,
        required: true,
        default:"no"
    },
    bookingtype:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    arrival:{
        type:String,
        required:true
    },
    journeytype:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
    
})

module.exports=mongoose.model('Subcategory',SubcategorySchema)