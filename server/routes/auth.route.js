const express = require('express')
const {  logOutController,  loginController,  test} = require("../controllers/auth.controller.js");

const router = express.Router();

//test route
router.get("/test", test);



// 

//login route
router.post("/login", loginController);

//logout route
router.get("/logout", logOutController);
 
module.exports = router;
// import express from "express";
// import {  logOutController,  loginController,  test}  from "../controllers/auth.controller.js";

// const router = express.Router();

// //test route
// router.get("/test", test);




// //login route
// router.post("/login", loginController);

// //logout route
// router.get("/logout", logOutController);
// export default router;