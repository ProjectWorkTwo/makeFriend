const mongoose = require("mongoose");

const serialPostSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  currentTime: {
    type: String,
    required: true,
  },
  likeNum: {
    type: Number,
  },
  shareNum: {
    type: Number,
  },
});

const UserSerialPost = mongoose.model("userSerialPost", serialPostSchema);

module.exports = UserSerialPost;
