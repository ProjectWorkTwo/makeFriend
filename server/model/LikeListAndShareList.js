const mongoose = require("mongoose");

const eachPostLikeShareList = new mongoose.Schema({
  likeList: [
    {
      likedUserName: {
        type: String,
        unique: true,
        required: false,
      },
      fullName: {
        type: String,
        unique: false,
        required: false,
      },
    },
  ],
  shareList: [
    {
      useredUserName: {
        type: String,
        unique: true,
        required: false,
      },
      fullName: {
        type: String,
        unique: false,
        required: false,
      },
    },
  ],
});

const postLikeShareList = mongoose.model(
  "eachPostLikeShareList",
  eachPostLikeShareList
);

module.exports = postLikeShareList;
