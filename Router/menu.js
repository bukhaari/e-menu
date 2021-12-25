const { schema, Model } = require("../Models/menu");
const auth = require("../Middleware/auth");
const express = require("express");
const router = express.Router();
const upload = require("../Middleware/multer");
const fs = require("fs");

//@GET API:
router.get("/", async (req, res) => {
  try {
    const datas = await Model.find().populate({
      path: "category",
      select: { name: 1 },
    });
    res.send(datas);
  } catch (ex) {
    res.send(ex);
    console.log(ex);
  }
});

//@POST API:
router.post("/", upload.single("image"), [reqData], async (req, res) => {
  console.log(req.file)
  try {
    // get avatar in file
    const image = req.file ? req.file.path : "uploads\\default.png";

    const newData = {
      ...reqBody,
      image,
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

//@PUT API:
router.put("/:id", upload.single("image"), [reqData], async (req, res) => {
  try {
    const keyId = req.params.id;

    // get post in db
    const getdata = await Model.findOne({ _id: keyId });

    if (!getdata) return res.send("not found data");

    // get avatar in file
    const image = req.file ? req.file.path : getdata.image

    const newData = {
      ...reqBody,
      image,
    };

    const dataUpdated = await Model.findByIdAndUpdate(
      keyId,
      {
        $set: newData,
      },
      { new: true }
    );

    // delete old image. if is not equal default.
    if (getdata.image !== "uploads\\default.png" && req.file) {
      fs.unlink(getdata.image, function (err) {
        if (err) return console.log(err);

        // if no error, file has been deleted successfully
        // console.log("File deleted!");
      });
    }

    res.send(dataUpdated);
  } catch (ex) {
    for (feild in ex.errors) {
      res.status(400).send(ex.errors[feild].message);
      console.log(ex.errors[feild].message);
    }
  }
});

//@DELETE API:
router.delete("/:id", async (req, res) => {
  try {
    const keyId = req.params.id;

    const getData = await Model.findOne({ _id: keyId });

    if (!getData) return res.send("not found data");

    await Model.deleteOne({ _id: keyId });

    res.send({ message: "deleted", status: true });
  } catch (ex) {
    for (feild in ex.errors) {
      res.status(400).send(ex.errors[feild].message);
      console.log(ex.errors[feild].message);
    }
  }
});

//Midlleware
function reqData(req, res, next) {
  try {
    reqBody = {
      name: req.body.name,
      category: req.body.categoryId,
      price: parseInt(req.body.price),
      description: req.body.description,
      available: JSON.parse(req.body.available.toLowerCase()),
      bestSeller: JSON.parse(req.body.bestSeller.toLowerCase()),
    };

    next();
  } catch (ex) {
    res.status(400).send(ex);
  }
}

module.exports = router;
