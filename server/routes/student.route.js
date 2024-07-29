const express = require('express')

const {teststudents,StudentsGetController,StudentsGetAllController} = require("../controllers/student.controller")
const router = express.Router();

//test route
router.get("/teststud", teststudents);
router.post("/studentget", StudentsGetController);
router.get("/studentgetall", StudentsGetAllController);




 
module.exports = router;