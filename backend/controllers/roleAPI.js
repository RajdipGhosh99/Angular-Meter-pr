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


router.put("/update-role-status/:id", async (req, res) => {
    const _id = req.params.id
    const { status, email, role_id}=req.body
    try {
        if (!status ||! email || !role_id) {
            res.status(400).json("Enter fields properly")

        } else {
            const dbResponse = await roleModel.findByIdAndUpdate(_id,{ status: req.body.status}, { new: true })
            res.status(200).json(dbResponse)

        }

    } catch (error) {
        res.status(400).json(error)

    }

});


router.get("/all", async (req, res) => {
    try {
        const dbResponse = await roleModel.find({status:"active"})
        res.status(200).json(dbResponse)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get("/active-inactive-role", async (req, res) => {
    try {
        const dbResponse = await roleModel.find({ $or: [{ status: "active" }, { status: "inactive" }]})
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


// router.get("/user-history/:email", async (req, res) => {
//     const mail = req.params.email
//     try {
//         const dbResponse = await userModel.historyModel().find().sort({ d: 1 })
//         if (dbResponse) {
//             let data = dbResponse.filter(dt => {
//                 return dt.d.email == mail
//             })


//             res.status(200).json(data)
//         } else {
//             res.status(400).json("Err:" + error)
//         }
//     } catch (error) {
//         res.status(400).json("Err:" + error)
//     }
// });

router.get("/all-role-history", async (req, res) => {
    try {
        const dbResponse = await roleModel.historyModel().find().sort({ d: 1 })
        if (dbResponse) {

            res.status(200).json(dbResponse)
        } else {
            res.status(400).json("Err:" + error)
        }
    } catch (error) {
        res.status(400).json("Err:" + error)
    }
});




module.exports = router