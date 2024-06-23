import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
      }
      const existingUser = await User.findOne({ email })
      if (existingUser) {
          return res.status(400).json({
              success: true,
              mwssage: "User exists"
          })
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
        const user = await User.findOne({ email })
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({
                success: true,
                message: "Invalid credentials"
            })
        }
        console.log('there there~!!!!');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.status(200).json({
            success: true,
            message: "User login Successfuly",
            token
        })
        console.log('here here');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not Login Successfully"
        })
    }
}