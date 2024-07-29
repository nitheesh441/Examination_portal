const express = require('express')

const {testerexams,ExamsGetFacultyController,ExamsGetStudentController,ExamsPostController,
    DeleteSubjectController,DeleteExamController,
   
     ExamsSubUpdateController} = require("../controllers/exam.controller")
const router = express.Router();

//test route
router.get("/testerexams", testerexams);//
router.get("/examsget", ExamsGetStudentController);//
router.get("/examsgetfac", ExamsGetFacultyController);//
router.post("/examspost", ExamsPostController);//




router.delete('/deletesubject', DeleteSubjectController);//

router.delete('/examdelete', DeleteExamController);//







router.put("/examsubupdate", ExamsSubUpdateController);//





 
module.exports = router;