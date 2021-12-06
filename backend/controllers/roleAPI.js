const express = require("express");
const roleModel = require("../models/roleModel")
const router = express.Router()


router.get("/", (req, res) => {
    res.json("Hello role")
});

router.post("/add", async (req, res) => {
    try {
        const { role_name, module_name, created_by } = req.body
        if (!role_name || !module_name || !created_by) {
            res.status(400).json("Enter fields properly")

        } else {
            const dbResponse = await roleModel(req.body).save()
            res.status(201).json(dbResponse)

        }

    } catch (error) {
        res.status(400).json(error)

    }

});

router.put("/update/:id", async (req, res) => {
    const _id = req.params.id
    try {

        const { role_name, module_name, created_by } = req.body
        if (!role_name || !module_name || !created_by) {
            res.status(400).json("Enter fields properly")

        } else {
            const dbResponse = await roleModel.findByIdAndUpdate(_id,req.body,{new:true})
            res.status(200).json(dbResponse)

        }

    } catch (error) {
        res.status(400).json(error)

    }

});


router.get("/all", async (req, res) => {
    try {
        const dbResponse = await roleModel.find()
        res.status(200).json(dbResponse)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.delete("/delete/:pId", async (req, res) => {
    const _id=req.params.pId
    try {
        const dbResponse = await roleModel.findByIdAndDelete(_id)
        res.status(200).json(dbResponse)
    } catch (error) {
        res.status(400).json(error)
    }
});





module.exports = router