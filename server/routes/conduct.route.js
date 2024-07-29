const express = require("express");
const multer = require("multer");
const {
  testerconduct,
  getCurrentExams,
  conductExam,AttendExam,AttendExamURL,SubmitExam
} = require("../controllers/conduct.controller");
const router = express.Router();

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log(req.body);


    const examName = file.originalname || 'default-name';
    cb(null, `${examName}`);
  },
});
const upload = multer({ storage });

router.post("/conductexam", upload.single("pdfFile"), conductExam);
router.post("/submit", SubmitExam);

router.post("/attend", AttendExam);
router.post("/attendurl", AttendExamURL);
router.get("/testerconduct", testerconduct);
router.get("/currentexams", getCurrentExams);

module.exports = router;
