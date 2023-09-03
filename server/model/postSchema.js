const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  postData: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      createdDate: {
        type: String,
      },
      currentTime: {
        type: String,
      },
    },
  ],
});

const UserPosts = mongoose.model("userPost", postSchema);

module.exports = UserPosts;
