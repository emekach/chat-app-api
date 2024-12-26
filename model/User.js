import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "An Email is required"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", UserSchema);

export default User;
