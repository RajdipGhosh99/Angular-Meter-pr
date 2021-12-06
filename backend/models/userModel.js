const mongoose = require("mongoose")
const Schema = mongoose.Schema



const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role_coll_id: [{ type: Schema.Types.ObjectId, ref: 'role' }
    ],
    created_date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    created_by: {
        type: String,
        default: "admin",
        trim: true
    }

})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel

