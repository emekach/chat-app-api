import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User id cannot be empty"],
    },
    firstName: {
      type: String,
      required: [true, " firstname is required"],
      miin: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      min: 2,
      max: 50,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      deafult: [],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", PostSchema);

export default Post;
