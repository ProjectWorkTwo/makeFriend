const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  postData: [],
});

const UserPosts = mongoose.model("userPost", postSchema);

module.exports = UserPosts;
