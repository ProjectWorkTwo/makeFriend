const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const multer = require("multer");

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
    // console.log(err);
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
      // const token = await userExist.generateAuthToken();
      // res.cookie("jwtToken", token, {
      //   expires: new Date(Date.now() + 2589000000),
      //   httpOnly: true,
      // });
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
  // console.log(req.body);
  try {
    const userNameExist = await User.findOne({ userName });

    try {
      // Setting user post for home page showing
      const newPost = await new UserSerialPost({
        fullName: userNameExist.fullName,
        userName,
        title,
        description,
        createdDate,
        currentTime,
        likeNum: [],
        shareNum: [],
      }).save();

      // This is mainly for profile based post showing
      const userPostExist = await UserPosts.findOne({ userName });
      userPostExist.postData = userPostExist.postData.concat(newPost._id);
      const userPostUpload = await userPostExist.save();

      if (userPostUpload) {
        res.status(201).json({ message: "Posted successfully" });
        res.end();
      } else {
        res.status(500).json({ error: "Faild to post" });
        res.end();
      }
    } catch (error) {
      // console.log("==============");
      const userPostExist = await new UserPosts({ userName }).save();
      // console.log(error);
    }
  } catch (err) {
    // console.log(err);
  }
});

router.get("/getPost", async (req, res) => {
  let allPostData = [];

  try {
    allPostData = await UserSerialPost.find();
    // console.log("====================>>");
    // console.log(allPostData);
  } catch (err) {
    // console.log(err);
  }
  res.send(allPostData);
});

// router.get('/likingPost', async(req, res)=>{
//   const targetId = new ObjectId(req.query.postId);
//   const currentPost = await UserSerialPost.findOne({_id: targetId});
//   res.send({allLike: currentPost.likeList})
// })
router.post("/likingPost", async (req, res) => {
  const { addOrRemove, postId, userName, fullName } = req.body;
  console.log(addOrRemove, postId, userName, fullName);
  try {
    // To generate Object id and must be require from 'mongodb'
    const targetId = new ObjectId(postId);
    console.log("1===========");
    console.log(targetId);
    const likedPost = await UserSerialPost.findOne({ _id: targetId });
    console.log(likedPost);
    if (addOrRemove) {
      console.log("before ==" + likedPost);
      likedPost.likeList = Array.from(
        new Set(likedPost.likeList.concat([userName, fullName]))
      );
      console.log("after ==" + likedPost);
      likedPost.save();
      console.log("matched");
    } else {
      console.log("matched!!!");
    }
    console.log(likedPost);
  } catch (err) {
    console.log("Not matched");
    // res.status(500).json({ message: "Faild to like" });
  }
  res.send({ message: "finished" });
});

module.exports = router;
