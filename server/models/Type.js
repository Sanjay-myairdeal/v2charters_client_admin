const mongoose=require('mongoose');
const Categorymodify=require('./Categorymodify');
const Subcategory=require('./Subcategory');
const TypeSchema=mongoose.Schema({
   section:{
    type:String,
    required:true
   },
   active:{
    type:String,
    required:true
   },
   addedBy:{
      type: mongoose.Schema.Types.ObjectId,  // Reference to the UserRole object
        ref: 'admin',  // Reference to the UserRole model
        required: true
    }
})

TypeSchema.pre('remove',async(req,res,next)=>{
   try {
      const typeId=this._id;
      const section=this.section;
      await Categorymodify.deleteMany({section:section}) 
      await Subcategory.deleteMany({section:section}) 
      next();
   } catch (error) {
      next(error)
   }
})
module.exports=mongoose.model('type',TypeSchema)