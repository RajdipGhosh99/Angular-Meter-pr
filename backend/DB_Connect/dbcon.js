const mongoose = require("mongoose")
const DBUrl = `mongodb+srv://rajdip:9842@cluster0.8zohx.mongodb.net/MeterDB?retryWrites=true&w=majority`

mongoose.connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection Successfull");
}).catch((err) => {
    console.log("DB connection faled Err:" + err);
})
module.exports = mongoose;