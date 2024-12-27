import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

// register user

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    const picturePath = req.file ? req.file.originalname : null;

    console.log(req.body);

    // check if user exists
    const userExist = await User.findOne({ email: email });
    if (userExist) return res.status(400).json({ msg: "email already exist" });

    const salt = await bcrypt.genSalt();
    console.log(salt);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    delete savedUser.password;

    res.status(201).json({
      status: "success",
      data: {
        savedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ msg: "user does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credential" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};
