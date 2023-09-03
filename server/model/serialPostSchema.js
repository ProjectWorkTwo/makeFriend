const mongoose = require("mongoose");

const serialPostSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
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

const UserSerialPost = mongoose.model("userSerialPost", serialPostSchema);

module.exports = UserSerialPost;
