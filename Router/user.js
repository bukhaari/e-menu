const { Model, schema } = require("../Models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const upload = require("../Middleware/multer");

//Getting secretkey in env
const SecretKey = process.env.SecretKey;

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

router.post("/", async (req, res) => {
  try {
    // destructuring req.boy object
    const { name, email, password, isAdmin, webUrl } = req.body;

    // looking on database this user is already exist?
    const getUser = await Model.findOne({ email: email });

    // checking user is Already
    if (getUser) return res.status(400).send("user is Already registred");

    // new data from req.body object destructuring
    let newUser = {
      name,
      email,
      password,
      isAdmin,
      webUrl,
    };


    // generate salt
    // const salt = await bcrypt.genSalt(10);
    // console.log("salt");
    //hashing password and update newuser object
    // newUser.password = await bcrypt.hash(newUser.password, salt);

    //schema user
    const user = new Model(newUser);

    // saving new user
    const result = await user.save();

    //cloning new result user and delete password
    let sendData = { ...result._doc };
    delete sendData.password;
    delete sendData.__v;

    //Janerate token
    const token = jwt.sign(sendData, SecretKey);

    // send token in header and send data
    res.header("token", token).send(sendData);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
      res.send(ex.errors[field].message);
    }
  }
});

router.put("/:id",  async (req, res) => {
  try {
    const keyId = req.params.id;

    // lookin this user is already in db.
    const getUser = await Model.findOne({ _id: keyId });

    //checking is already
    if (!getUser) return res.status(404).send("Data was not found");

    const result = await Model.findOneAndUpdate(
      { _id: keyId },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    //cloning new result user and delete password
    let sendData = { ...result._doc };
    delete sendData.password;
    delete sendData.__v;

    res.send(sendData);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
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

module.exports = router;
