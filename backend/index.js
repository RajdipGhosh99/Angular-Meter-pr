const express = require("express");
const port= process.env.PORT || 9000
require("./DB_Connect/dbcon")
const meterAPI = require("./controllers/meterAPI")
const cors = require("cors")

const app= express()
app.use(express.json())
app.use(cors({origin:true,credentials:true}))


app.use("/value",meterAPI)
app.get("/", (req, res) => {
  res.status(200).json('Hello Express')
});


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));