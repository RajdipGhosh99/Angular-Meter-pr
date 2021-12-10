const mongoose=require("mongoose")
const mongooseHistory = require('mongoose-history')
const Schema = mongoose.Schema

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
    },
    status:{
        type:String,
        trim:true,
        default:"active"
    }

})

roleScheme.plugin(mongooseHistory)

const roleModel=mongoose.model("role",roleScheme)

module.exports=roleModel