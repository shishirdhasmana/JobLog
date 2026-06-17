import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

function generateToken(user) {
  return jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h" });
}

//Register User
//http://localhost:3000/api/users/signUp
router.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//User LogIn
//http://localhost:3000/api/users/logIn
router.post("/logIn", async (req, res) => {
  try {
    const user = await User.getUserCredentials(
      req.body.email,
      req.body.password,
    );
    res.status(200).json({
      success: true,
      token: generateToken(user),
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
