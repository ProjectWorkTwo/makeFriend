const mongoose = require("mongoose");

const eachPostLikeShareList = new mongoose.Schema({
  likeList: [
    {
      likedUserName: {
        type: String,
      },
      fullName: {
        type: String,
      },
      profilePic: {
        type: String
      }
    },
  ],
  shareList: [
    {
      useredUserName: {
        type: String,
      },
      fullName: {
        type: String,
      },
      profilePic: {
        type: String
      }
    },
  ],
});

const postLikeShareList = mongoose.model(
  "eachPostLikeShareList",
  eachPostLikeShareList
);

module.exports = postLikeShareList;
