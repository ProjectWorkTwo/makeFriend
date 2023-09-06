const mongoose = require("mongoose");

const serialPostSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: false,
  },
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  createdDate: {
    type: String,
    required: true,
    unique: false,
  },
  currentTime: {
    type: String,
    required: true,
    unique: false,
  },
  postImg: {
    type: String,
    unique: false,
  },
  postLikeShareList: {
    type: Object,
    unique: true
  }
});

const UserSerialPost = mongoose.model("userSerialPost", serialPostSchema);

module.exports = UserSerialPost;
