const mongoose = require("mongoose")


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

const meterModel = mongoose.model("meterReading", meterSchema)

module.exports = meterModel