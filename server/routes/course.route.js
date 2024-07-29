const express = require('express')

const {testercourse,CoursesGetController,CoursesAddController,CoursesUpdateController,CoursesDeleteController,Subject,Coursecode} = require("../controllers/courses.controller")
const router = express.Router();

//test route
router.get("/testercourse", testercourse);
router.get("/courseget", CoursesGetController);
router.get("/coursecode", Coursecode);
router.post("/subject", Subject);
router.post('/courseadd', CoursesAddController);

router.put('/courseupdate', CoursesUpdateController);

router.post('/coursedelete', CoursesDeleteController);



 
module.exports = router;