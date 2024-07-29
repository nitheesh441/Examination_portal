const express = require('express')

const {testfaculty,FacultysGetController} = require("../controllers/faculty.controller")
const router = express.Router();

//test route
router.get("/testfac", testfaculty);
router.post("/facultyget", FacultysGetController);




 
module.exports = router;