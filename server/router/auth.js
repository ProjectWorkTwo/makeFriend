const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: "./config.env" });
require("../db/connection");
const User = require("../model/userSchema");
const UserPosts = require("../model/postSchema");
const UserSerialPost = require("../model/serialPostSchema");
const PostLikeShareList = require("../model/LikeListAndShareList");

router.post("/register", async (req, res) => {
  const {
    fullName,
    userName,
    email,
    password,
    dob,
    gender,
    profilePic,
    profileCover,
    bio,
  } = req.body;

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
      const emailExist = await User.findOneAndRemove({ email });
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
        bio,
        profileCover,
        profilePic,
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const fileExtension = path.extname(originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = originalname.replace(/\s+/g, "_");
    const fileName =
      sanitizedFilename.substring(0, sanitizedFilename.lastIndexOf(".")) +
      "-" +
      uniqueSuffix +
      fileExtension;

    cb(null, fileName);
  },
});
router.use("/uploads", express.static("uploads"));
const upload = multer({ storage: storage });

router.post("/createPost", upload.single("postImg"), async (req, res) => {
  // console.log(req.body);
  const { userName, title, description, createdDate, currentTime } = req.body;

  let fullName;

  let postImg;
  if (req.file) {
    postImg = req.file.filename;
  } else {
    postImg = undefined;
  }

  try {
    const authorData = await User.findOne({ userName });
    fullName = authorData.fullName;

    // console.log("FullName === " + fullName);

    let authorsPost;
    try {
      authorsPost = await UserPosts.findOne({ userName });
      if (!authorsPost) {
        authorsPost = new UserPosts({ userName });
        authorsPost.save();
      }
    } catch (err) {
      // console.log(err);
    }

    let newPostLikeShareList;
    try {
      newPostLikeShareList = await new PostLikeShareList({
        likeList: [],
        shareList: [],
      }).save();
    } catch (err) {
      // console.log(err);
    }

    // console.log("newPostLikeShareList === ");
    // console.log(newPostLikeShareList);

    try {
      const newPost = await new UserSerialPost({
        _id: new ObjectId(),
        fullName,
        userName,
        title,
        description,
        createdDate,
        currentTime,
        postImg,
        postLikeShareList: newPostLikeShareList._id,
      }).save();

      // console.log("newPost =====");
      // console.log(newPost);

      try {
        const updatedUserPost = await UserPosts.findOneAndUpdate(
          { userName },
          {
            $push: {
              postData: newPost._id,
            },
          },
          {
            new: true,
          }
        );

        // console.log("authorsPost ===== ");
        // console.log(updatedUserPost);
      } catch (err) {
        // console.log("authorsPost err ====");
        // console.log(err);
      }

      if (authorsPost) {
        res.status(201).json({ message: "Posted successfully" });
        res.end();
      } else {
        res.status(500).json({ error: "Faild to post" });
        res.end();
      }
    } catch (err) {
      // console.log(err);
    }
  } catch (err) {
    // console.log(err);
  }
});
router.get("/getPost", async (req, res) => {
  let allPostData = [];

  try {
    allPostData = await UserSerialPost.find();
  } catch (err) {
    // console.log(err);
  }
  res.json(allPostData);
});

router.get("/getProfilePic/:userName", async (req, res) => {
  const userName = req.params.userName;
  // console.log(userName);
  try {
    const userData = await User.findOne({ userName });
    if (!userData) {
      return res.status(404).json({ message: "Content not found" });
    }
    // console.log(userData);
    res.status(200).json({ profilePic: userData.profilePic });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getProfilePosts/:userName", async (req, res) => {
  const userName = req.params.userName;
  // console.log(userName);
  try {
    let userAllPostIds = await UserPosts.findOne({ userName }).populate(
      "postData"
    );

    if (!userAllPostIds) {
      return res.status(404).json({ message: "Content not found" });
    }
    try {
      userAllPostIds = await userAllPostIds.postData;

      if (!userAllPostIds) {
        return res.status(404).json({ message: "Content not found" });
      }
      try {
        const userAllPostsData = await UserSerialPost.find({
          _id: { $in: userAllPostIds },
        });
        if (!userAllPostsData) {
          return res.status(404).json({ message: "Content not found" });
        }
        res.json(userAllPostsData);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/setProfileCover/:userName",
  upload.single("profileCover"),
  async (req, res) => {
    const userName = req.params.userName;

    let profileCover;
    if (req.file) {
      profileCover = req.file.filename;
    } else {
      profileCover = undefined;
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { userName },
        {
          $set: {
            profileCover,
          },
        },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({ profileCover });
      } else {
        res.status(404).json({ message: "Content not found" });
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.post(
  "/setProfilePic/:userName",
  upload.single("profilePic"),
  async (req, res) => {
    const userName = req.params.userName;

    let profilePic;
    if (req.file) {
      profilePic = req.file.filename;
    } else {
      profilePic = undefined;
    }

    try {
      const updatedData = await User.findOneAndUpdate(
        { userName },
        {
          $set: {
            profilePic,
          },
        },
        { new: true }
      );

      if (updatedData) {
        res.status(200).json({ profilePic });
      } else {
        res.status(404).json({ message: "Content not found" });
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.get("/getProfileInfo/:userName", async (req, res) => {
  const userName = req.params.userName;

  try {
    const profileInfo = await User.findOne({ userName });

    if (profileInfo) {
      const {
        fullName,
        email,
        dob,
        joinDate,
        gender,
        bio,
        profilePic,
        profileCover,
      } = profileInfo;

      res.status(200).json({
        fullName,
        email,
        dob,
        joinDate,
        gender,
        bio,
        profilePic,
        profileCover,
      });
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/updateInfo/:userName", async (req, res) => {
  const userName = req.params.userName;
  const { fullName, email, bio } = req.body;
  console.log(req.body);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName },
      {
        $set: {
          fullName,
          email,
          bio,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
// router.get("/getLikeShareList/:postId", async (req, res) => {
//   const postId = req.params.postId; // Extract the postId from the URL

//   const postData = await UserSerialPost.findById(postId);

//   // const postReactionData = await PostLikeShareList.findById(
//   //   postData.postLikeShareList
//   // );

//   // console.log(postData);

//   // res.send(postReactionData);
// });
// router.post("/getLikeShareList/:postId", async (req, res) => {
//   const postId = req.params.postId;

//   console.log(req.body);
//   console.log("Clicked");
//   const { userName, fullName, liked } = req.body;

//   const postData = await UserSerialPost.findById(postId);
//   console.log(postData);

//   const postReactionId = postData.postLikeShareList;
//   // console.log(postReactionId);
//   try {
//     //   await PostLikeShareList.findByIdAndUpdate(
//     //     postReactionId,
//     //     {
//     //       $addToSet: {
//     //         likeList:{
//     //           userName,
//     //           fullName,
//     //         }
//     //       },
//     //     },
//     //     { new: true }
//     //   );
//     const postReact = await PostLikeShareList.findOne({ _id: postReactionId });
//     console.log(postReact);
//     // let likeList = await postReact.likeList;
//     // if(likeList.includes({likedUserName:userName, fullName})){
//     //   likeList = likeList.filter((item)=>item.likedUserName!==userName);
//     // }else{
//     //   likeList.push({likedUserName:userName, fullName});
//     // }
//     // let likedUserIndex = likeList.findIndex((item) => {
//     //   return item.likedUserName === userName;
//     // });
//     // console.log(likedUserIndex);
//     // if (likedUserIndex === -1) {
//     //   likeList = [...likeList, { likedUserName: userName, fullName }];
//     //   console.log(likeList);
//     // } else {
//     //   likeList = likeList.filter((item) => item.likedUserName !== userName);
//     //   console.log('hello ============');
//     //   console.log(likeList);
//     // }
//     // postReact.likeList = likeList;
//     // console.log(likeList);
//     // likeList = Array.from(new Set(likeList));
//     // await postReact.save();
//     // console.log('after update ====');
//     // console.log(postReact);
//     // console.log(likeList);
//     console.log("====================");
//   } catch (err) {
//     console.log(err);
//     console.log("==!===!==!==!=!==!===!==!=!==");
//   }

//   // const updatedItem = await PostLikeShareList.findByIdAndUpdate();

//   UserSerialPost.update({_id: postId}, {$set: {likeList: likeList}});
//   // const postReactionData = await PostLikeShareList.findOne({
//   //   _id: postData.postLikeShareList,
//   // });

//   // postReactionData.likeList = totalLikeList;
//   // postReactionData.save();

//   // console.log(postReactionData.likeList);

//   res.send({ message: "OK" });
// });

// router.get('/likingPost', async(req, res)=>{
//   const targetId = new ObjectId(req.query.postId);
//   const currentPost = await UserSerialPost.findOne({_id: targetId});
//   res.send({allLike: currentPost.likeList})
// })
// router.post("/likingPost", async (req, res) => {
//   const { addOrRemove, postId, userName, fullName } = req.body;
//   // console.log(addOrRemove, postId, userName, fullName);
//   try {
//     // To generate Object id and must be require from 'mongodb'
//     const targetId = new ObjectId(postId);
//     console.log("1===========");
//     // console.log(targetId);
//     const likedPost = await UserSerialPost.findOne({ _id: targetId });
//     // console.log(likedPost);
//     if (addOrRemove) {
//       // console.log("before ==" + likedPost);
//       likedPost.likeList = Array.from(
//         new Set(likedPost.likeList.concat({ userName, fullName }))
//       );
//       // console.log("after ==" + likedPost);
//       likedPost.save();
//       // console.log("matched");
//     } else {
//       // console.log("matched!!!");
//     }
//     // console.log(likedPost);
//   } catch (err) {
//     // console.log("Not matched");
//     // res.status(500).json({ message: "Faild to like" });
//   }
//   res.send({ message: "finished" });
// });

module.exports = router;
