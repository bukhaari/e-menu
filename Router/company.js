const { schema, Model } = require("../Models/company");
const auth = require("../Middleware/auth");
const express = require("express");
const router = express.Router();

//@GET API:
router.get("/", async (req, res) => {
  try {
    const datas = await Model.find();
    res.send(datas);

  } catch (ex) {
    res.send(ex);
    console.log(ex);
  }
});

//@POST API:
router.post("/", async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
    };

    const newModel = Model(newData);
    const result = await newModel.save();
    res.send(result);

  } catch (ex) {
    for (feild in ex.errors) {
      res.status(400).send(ex.errors[feild].message);
      console.log(ex.errors[feild].message);
    }
  }
});

//@PUT API: of like --> api/post/like
router.put("/:id", async (req, res) => {
  try {
    const keyId = req.params.id;

    const newData = {
      name: req.body.name,
    };

    // get post in db
    const getData = await Model.find({ _id: keyId });

    if (!getData) return res.send("not found data");

    const dataUpdated = await Model.findByIdAndUpdate(keyId, {
      $set: newData,
    },{new:true});

    res.send(dataUpdated);
    
  } catch (ex) {
    for (feild in ex.errors) {
      res.status(400).send(ex.errors[feild].message);
      console.log(ex.errors[feild].message);
    }
  }
});

module.exports = router;
