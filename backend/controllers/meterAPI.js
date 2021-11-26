const express = require("express");
const meterModel = require("../models/meterModel")
const router = express.Router();


router.get("/", (req, res) => {
    res.json("Hello Value")
})

router.post("/add", async (req, res) => {
    const { mName, mDate, mTime, mReading } = req.body

    try {
        if (!mName || !mDate || !mTime) {
            res.status(400).json("Enter fields properly")

        } else {

            const userInput = meterModel(req.body)
            const dbResponse = await userInput.save()
            if (dbResponse) {
                res.status(201).json(dbResponse)
                console.log(dbResponse);
            } else {
                throw new error
            }
        }

    } catch (error) {
        res.status(400).json("Err:" + error)
    }
})


router.get("/viewall", async (req, res) => {
    try {
        const dbResponse = await meterModel.find()
        if (dbResponse) {
            res.status(200).json(dbResponse)
        } else {
            res.status(400).json("No data found ")
        }

    } catch (error) {
        res.status(400).json("Something Error :" + error)
    }

});

//update through id

router.put("/update/:vId", async (req, res) => {
    try {
        const userInput = req.body
        console.log(userInput);
        if (userInput) {
            const _id = req.params.vId
            const dbResponse = await meterModel.findByIdAndUpdate(_id, userInput, { new: true })
            res.status(200).json(dbResponse)
        } else {
            res.status(400).json("Enter what is need to be updated")
        }

    } catch (error) {
        res.status(400).json("Somehing Error:" + error)
    }

})

//delete through id

router.delete("/delete/:vId", async (req, res) => {
    try {
        const _id = req.params.vId
        const dbResponse = await meterModel.findByIdAndRemove(_id)
        res.status(200).json(dbResponse)
    } catch (error) {
        res.status(400).json("Somehing Error:" + error)
    }
})


//add value into mReading Array through id

router.put("/add-reading/:pId", async (req, res) => {
    const _id = req.params.pId
    let { rValue, rUnit, rDate, rTime } = req.body
    try {
        if (!rValue || !rUnit || !rDate || !rTime) {
            res.status(422).json("Enter Reading Fields properly")

        } else {
            const dbResponse = await meterModel.findByIdAndUpdate(_id, { $push: { mReading: { rValue, rUnit, rDate, rTime } } }, { new: true })
            res.status(200).json(dbResponse)
        }


    } catch (error) {
        res.status(400).json("Somehing Error:" + error)
    }
})


// delete value into mReading Array through id

router.put("/delete-reading/:pId", async (req, res) => {
    const _id = req.params.pId
    console.log(req.body._id);
    
    try {
        if (!req.body._id) {
            res.status(422).json("Enter Reading Fields properly")

        } else {
            const dbResponse = await meterModel.findByIdAndUpdate(_id, { $pull: { mReading: { _id:req.body._id } } }, )
            res.status(200).json(dbResponse)
        }


    } catch (error) {
        res.status(400).json("Somehing Error:" + error)
    }
})




//search by id
router.get("/find-by-id/:pId", async (req, res) => {
    try {
        const _id = req.params.pId
        const dbResponse = await meterModel.findById(_id)
        if (dbResponse) {
            res.status(200).json(dbResponse)
        } else {
            throw new error
        }

    } catch (error) {
        res.status(400).json("Data not found:" + error)
    }

});


router.post("/search-by-unit/:pId", async(req, res) => {
    const _id = req.params.pId
    try {
        if (!req.body.rUnit) {
            res.status(422).json("Enter Reading Fields properly")

        } else {
            const dbResponse = await meterModel.findOne({_id})
           
            let sortData = dbResponse.mReading.filter(v => v.rUnit == req.body.rUnit )


            res.status(200).json(sortData)
        }


    } catch (error) {
        res.status(400).json("Somehing Error:" + error)
    }
});






module.exports = router;