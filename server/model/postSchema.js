const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  postData: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'userSerialPost'
    }
  ],
});

const UserPosts = mongoose.model("userPost", postSchema);

module.exports = UserPosts;
