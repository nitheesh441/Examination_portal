const express = require('express')

const {tester,DashboardGetController,DashboardPostController,UpExamGetController,UpResultGetController} = require("../controllers/dash.controller.js")
const router = express.Router();

//test route
router.get("/tester", tester);
router.get("/dashboardget", DashboardGetController);
router.post("/dashboardpost",DashboardPostController);
router.get("/upexam", UpExamGetController);
router.get("/upresults",UpResultGetController)



 
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