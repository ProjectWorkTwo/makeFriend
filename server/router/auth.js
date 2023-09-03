const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

dotenv.config({ path: "./config.env" });
require("../db/connection");
const User = require("../model/userSchema");
const UserPosts = require("../model/postSchema");
const UserSerialPost = require("../model/serialPostSchema");

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
    } else {
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

      const newUserPost = new UserPosts({
        userName,
      });

      const userRegister = await user.save();
      const userPostSetting = await newUserPost.save();

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
    try {
      userExist = await User.findOne({ userName });
      isPasswordMatch = await bcrypt.compare(password, userExist.password);
    } catch (e) {
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
      res
        .status(500)
        .json({ response: "Wrong email or password", errorExist: true });
    }
  } catch (error) {
    res.json({ error: "Server Error" });
  }
});

router.get("/", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/createPost", async (req, res) => {
  const { userName, title, description, createdDate, currentTime } = req.body;
  console.log(req.body);
  try {
    const userNameExist = await User.findOne({ userName });
    
    console.log("==> " + userNameExist);
    
    await new UserSerialPost({ 
      userName,
      title,
      description,
      createdDate,
      currentTime,
    }).save();
    try {
      const userPostExist = await UserPosts.findOne({ userName });
      userPostExist.postData = userPostExist.postData.concat({
        title,
        description,
        createdDate,
        currentTime,
      });
      const userPostUpload = await userPostExist.save();

      if(userPostUpload){
        res.status(201).json({message: 'Posted successfully'});
        res.end();
      }else{
        res.status(500).json({error: 'Faild to post'})
        res.end();
      }
      
    } catch (error) {
      console.log("==============");
      const userPostExist = await new UserPosts({ userName }).save();
      // const userPostSetting = await new Post({ userName }).save();
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/getPost', async (req, res)=>{
  let allPostData = [];

  try{
    allPostData = await UserPosts.find();
    console.log(allPostData);
  }catch(err){
    console.log(err);
  }
  res.send(allPostData);
})

module.exports = router;
