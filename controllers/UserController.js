import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: true,
        mwssage: "User exists",
      });
    }
    const newUser = new User({ name, email, password });
    const response = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: true,
        message: "Invalid credentials",
      });
    }
    console.log("there there~!!!!");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "User login Successfuly",
      token,
    });
    console.log("here here");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not Login Successfully",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!response) {
      return res.status(401).json({
        success: true,
        message: "User not Found",
        response,
      });
    }
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findByIdAndDelete(userId);
    if (!response) {
      return res.status(401).json({
        success: true,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User unable to delete",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(401).json({
        success: true,
        message: "No users available",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users get successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users not found",
    });
  }
};
