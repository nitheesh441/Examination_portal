const express = require('express')
const {testresults,ResultsGetController,ResultsPostController,StudentresultGetController,ExamNameController} = require("../controllers/result.controller")

const router = express.Router();

//test route
router.get("/testresults", testresults);
router.get("/examname", ExamNameController);
router.post("/resultsget", ResultsGetController);
router.post("/resultspost", ResultsPostController);
router.get("/resultstudent",StudentresultGetController );






 
module.exports = router;