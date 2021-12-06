const mongoose=require("mongoose")

const roleScheme= new mongoose.Schema({
    role_name:{
        type:String,
        trim:true
    },
    module_name:{
        type:Array
    },
    created_date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    created_by: {
        type: String,
        trim: true
    }

})

const roleModel=mongoose.model("role",roleScheme)

module.exports=roleModel