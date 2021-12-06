const express = require("express");
const userModel = require("../models/userModel")
const router = express.Router()


router.get("/", (req, res) => {
  res.json("Hello User")
});


router.post("/admin-register", async (req, res) => {
  const { user_name, email, password } = req.body
  try {
    if (!user_name || !email || !password) {
      res.status(400).json("Enter fields properly")
    } else {
      const reqData = userModel(req.body)
      const dbResponse = await reqData.save()
      console.log(dbResponse);
      res.status(201).json(dbResponse)
    }
  } catch (error) {
    res.status(400).json("Err:" + error)
  }

})

router.post("/new", async (req, res) => {
  const { user_name, email, password, role_coll_id, created_by } = req.body
  try {
    if (!user_name || !email || !password || !role_coll_id || !created_by) {
      res.status(400).json("Enter fields properly")
    } else {
      const reqData = userModel(req.body)
      const dbResponse = await reqData.save()
      console.log(dbResponse);
      res.status(201).json(dbResponse)
    }
  } catch (error) {
    res.status(400).json("Err:" + error)
  }

})

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id
  const { user_name, email, password, role_coll_id } = req.body
  try {
    if (!user_name || !email || !password || !role_coll_id) {
      res.status(400).json("Enter fields properly")
    } else {
      const dbResponse = await userModel.findByIdAndUpdate(id, req.body, { new: true })
      console.log(dbResponse);
      res.status(200).json(dbResponse)
    }
  } catch (error) {
    res.status(400).json("Err:" + error)
  }

})

router.get("/all", async (req, res) => {

  try {
    const dbResponse = await userModel.find({ "isAdmin": false }).populate("role_coll_id")
    if (dbResponse) {
      res.status(200).json(dbResponse)
    } else {
      throw new error
    }
  } catch (error) {
    res.status(400).json("Err:" + error)
  }

})

router.get("/find-by-id/:id", async(req, res) => {
  const _id=req.params.id
  try {
    const dbResponse = await userModel.findById(_id).populate("role_coll_id")
    if (dbResponse) {
      res.status(200).json(dbResponse)
    } else {
      throw new error
    }
  } catch (error) {
    res.status(400).json("Err:" + error)
  }
  
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const dbResponse = await userModel.findByIdAndRemove(_id)
    if (dbResponse) {
      res.status(200).json(dbResponse)
    } else {
      throw new error
    }
  } catch (error) {
    res.status(400).json("Err:" + error)
  }

})


router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      res.status(400).json("Enter fields properly")

    } else {
      const dbResponse = await userModel.findOne({ email, password })
      if (dbResponse) {
        res.status(200).json(dbResponse)

      } else {
        res.status(400).json("Invalid Creadentials")
      }

    }

  } catch (error) {
    res.status(400).json("Invalid Creadentials")
  }

});


router.post("", (req, res) => {

});


module.exports = router