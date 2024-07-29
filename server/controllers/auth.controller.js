
const Login = require('../models/Login');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const Faculty= require("../models/faculty.model")
// Test controller
const test = (req, res) => {
  return res.send("Hello From Test!");
};

// Login controller
const loginController = async (req, res) => {
  const { username, password, usertype } = req.body;


  try {
    if (!username || !password) {
      return res.status(200).send({
        success: false,
        message: "All fields are required!",
      });
    }
    if (usertype == 'student') {
      const rollNo=username;
      const user = await Student.findOne({ rollNo });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }
      const pass = await Student.findOne({ password });
      if (!pass) {
        return res.status(404).send({
          success: false,
          message: "Password Incorrect!",
        });
      }


      const login = await Student.findOne({ rollNo, password });
      if (!login) {
        return res.status(404).send({
          success: false,
          message: "Check the Login form!",
        });
      }




      const token = jwt.sign(
        { id: login._id, rollNo: login.rollNo, usertype: usertype },
        process.env.JWT_SECRET

      );
     

      // Set the token as a cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      });

      // Send the login data in the response

      const { password: passw, ...rest } = login._doc;
      //res.json({token, success: true, message: 'Login Successful', user: { username: login.username, usertype: login.usertype } });
      res.status(200).json({
        success: true,
        message: "Login Success",
        user: rest,
        token,
      });
    }
    if (usertype == 'faculty') {
      const staffid=username;
      const user = await Faculty.findOne({ staffid });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }
      const pass = await Faculty.findOne({ password });
      if (!pass) {
        return res.status(404).send({
          success: false,
          message: "Password Incorrect!",
        });
      }


      const login = await Faculty.findOne({ staffid, password });
      if (!login) {
        return res.status(404).send({
          success: false,
          message: "Check the Login form!",
        });
      }




      const token = jwt.sign(
        { id: login._id, staffid: login.staffid, usertype: usertype },
        process.env.JWT_SECRET

      );
     

      // Set the token as a cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      });

      // Send the login data in the response

      const { password: passw, ...rest } = login._doc;
      //res.json({token, success: true, message: 'Login Successful', user: { username: login.username, usertype: login.usertype } });
      res.status(200).json({
        success: true,
        message: "Login Success",
        user: rest,
        token,
      });
    }
    if (usertype == 'parent') {
      const rollNo=username;
      const parentNo = password;
      const user = await Student.findOne({ rollNo });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }
      const pass = await Student.findOne({ parentNo });
      if (!pass) {
        return res.status(404).send({
          success: false,
          message: "Password Incorrect!",
        });
      }


      const login = await Student.findOne({ rollNo, parentNo });
      if (!login) {
        return res.status(404).send({
          success: false,
          message: "Check the Login form!",
        });
      }




      const token = jwt.sign(
        { id: login._id, rollNo: login.rollNo, usertype: usertype },
        process.env.JWT_SECRET

      );
     

      // Set the token as a cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      });

      // Send the login data in the response

      const { password: passw, ...rest } = login._doc;
      //res.json({token, success: true, message: 'Login Successful', user: { username: login.username, usertype: login.usertype } });
      res.status(200).json({
        success: true,
        message: "Login Success",
        user: rest,
        token,
      });
    }

  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout controller
const logOutController = (req, res) => {
  try {
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  test,
  loginController,
  logOutController
};
