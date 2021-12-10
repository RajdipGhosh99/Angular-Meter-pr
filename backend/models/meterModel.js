const mongoose = require("mongoose")
const mongooseHistory = require('mongoose-history')
const Schema = mongoose.Schema


const meterSchema = new mongoose.Schema({
    mName: {
        type: String,
        trim: true,
        unique:true

    },
    mDate: {
        type: String,
        trim: true,
    },
    mTime: {
        type: String,
        trim: true,

    },
    mReading:[
        {
            rValue: { type: Number}, 
            rUnit: {type:String},
            rDate: {type:String},
            rTime: {type:String}

        }
    ]
})

meterSchema.plugin(mongooseHistory)

const meterModel = mongoose.model("meterReading", meterSchema)

module.exports = meterModel