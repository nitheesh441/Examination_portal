const express = require('express')

const {testfeedback,FeedbacksGetController,FeedbacksPostController} = require("../controllers/feedback.controller")
const router = express.Router();

//test route
router.get("/testerfeedback", testfeedback);
router.get("/feedbacksget", FeedbacksGetController);
router.post("/feedbackspost", FeedbacksPostController);




 
module.exports = router;