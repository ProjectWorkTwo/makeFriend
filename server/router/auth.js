const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config.env" });
require("../db/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("<h1>Hello world from server</h1>");
});
router.get("/register", (req, res) => {
  res.send("<h1>Hello world from register page</h1>");
});
router.get("/login", (req, res) => {
  res.send("<h1>Hello world from login page</h1>");
});

router.post("/register", async (req, res) => {
  const { fullName, userName, email, password, dob, gender } = req.body;

  if (!fullName || !userName || !email || !password || !dob || !gender) {
    return res.status(400).json({ error: "Please fillup full form" });
  }

  try {
    const userNameExist = await User.findOne({ userName: userName });

    if (userNameExist) {
      return res
        .status(422)
        .json({ message: "user exist", userNameExist: true });
    }else {
      const emailExist = await User.findOneAndRemove({ email: email });
      if (emailExist) {
        return res
          .status(422)
          .json({ message: "user exist", emailExist: true });
      }
      const user = new User({
        fullName,
        userName,
        email,
        password,
        dob,
        gender,
      });

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "Register successful" });
        res.end();
      } else {
        res.status(500).json({ error: "Faild to registerd" });
        res.end();
      }
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: "Fillup full form" });
  }

  try {
    let userExist = null;
    let isPasswordMatch = null;
    try{
      userExist = await User.findOne({ userName });
      isPasswordMatch = await bcrypt.compare(password, userExist.password);
    }catch(e){
      userExist = undefined;
      isPasswordMatch = undefined;
    }

    if (userExist && isPasswordMatch) {
      const token = await userExist.generateAuthToken();
      res.cookie("jwtToken", token, {
        expires: new Date(Date.now() + 2589000000),
        httpOnly: true,
      });
      res.status(201).json({ response: "Your are logged in" });
    } else {
      res.status(500).json({ response: "Wrong email or password", errorExist: true});
    }
  } catch (error) {
    res.json({ error: "Server Error" });
  }
});

module.exports = router;
