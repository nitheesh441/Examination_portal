const Exams = require("../models/exams.model");
const Conduct = require("../models/conductexam.model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require('path');


const testerconduct = (req, res) => {
  return res.send("Hello From Conduct!");
};

const getCurrentExams = async (req, res) => {
  try {
    const currentTime = new Date();
    const pastTime = new Date(currentTime.getTime() - 15 * 60000);
    const futureTime = new Date(currentTime.getTime() + 15 * 60000);

    const exams = await Exams.find({
      $or: [
        { "subjects.startTime": { $lte: futureTime } }, // Exams that have started
        { "subjects.endTime": { $gte: pastTime } }, // Exams that haven't ended
      ],
    });

    const activeSubjects = exams.flatMap((exam) =>
      exam.subjects
        .filter(
          (subject) =>
            subject.startTime <= futureTime && subject.endTime >= pastTime
        )
        .map((subject) => ({
          examName: exam.examName,
          subjectName: subject.subjectName,
          courseCode: subject.courseCode,
          startTime: subject.startTime,
          endTime: subject.endTime,
        }))
    );

    res.status(200).json(activeSubjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const conductExam = async (req, res) => {
  const { meetURL, pin, subjects, examName } = req.body;
  console.log(req.body);
  const pdfFile = req.file;
  console.log("pdfFile",pdfFile);

  if (!pdfFile) {
    return res.status(400).json({ error: "PDF file is required" });
  }
  console.log("examname", examName);

  try {
    const newConduct = new Conduct({
      examName,
      subjects: subjects.map((subject) => ({
        subjectName: subject.subjectName,
        courseCode: subject.courseCode,
        meetURL: meetURL,
        questionPaper: pdfFile.filename,
        pin: pin,
      })),
    });

    await newConduct.save();

    res
      .status(201)
      .json({ message: "Exam conducted successfully", newConduct });
  } catch (error) {
    console.error("Error conducting exam:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const SubmitExam = async (req, res) => {
  const { subjects, examName, studentId } = req.body;


  const pdfFile = req.file;
  

  console.log("examname", examName);
  
  try {
    const newConduct = new Conduct({
      examName,
      subjects: subjects.map((subject) => ({
        subjectName: subject.subjectName,
        courseCode: subject.courseCode,
        meetURL: meetURL,
        questionPaper: pdfFile.filename,
        pin: pin,
        submissions: [], // Initialize submissions as an empty array
      })),
    });
  
    await newConduct.save();
  
    res.status(201).json({ message: "Exam conducted successfully", newConduct });
  } catch (error) {
    console.error("Error conducting exam:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const AttendExam = async (req, res) => {
  
  const data = req.body;
  const firstData = data[0]; 
  const examName = firstData.examName;
  const subjectName = firstData.subjectName;
  const courseCode = firstData.courseCode;
 
    try{
    const examdata = await Conduct.findOne({
      examName: examName,
      "subjects.subjectName": subjectName,
      "subjects.courseCode": courseCode,
    });
   
    if (!examdata) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const questionPaper = examdata.subjects[0].questionPaper;
    const pdfPath = path.join(__dirname, '..', 'uploads', questionPaper); // Adjust the path as needed

    res.download(pdfPath); // Send the PDF file as a download response
  }
 

 catch (error) {
    console.error("Error conducting exam:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const AttendExamURL = async (req, res) => {
  
  const data = req.body;
  const firstData = data[0]; 
  const examName = firstData.examName;
  const subjectName = firstData.subjectName;
  const courseCode = firstData.courseCode;
 
    try{
    const examdata = await Conduct.findOne({
      examName: examName,
      "subjects.subjectName": subjectName,
      "subjects.courseCode": courseCode,
    });
   
    if (!examdata) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    else{
      const questionPaper = examdata.subjects[0].questionPaper;
      const pin=examdata.subjects[0].pin;
      const meetURL=examdata.subjects[0].meetURL;
      res.json({ meetURL, pin });
    }

   
  }
 

 catch (error) {
    console.error("Error conducting exam:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  testerconduct,
  getCurrentExams,
  conductExam,
  AttendExam,AttendExamURL,SubmitExam
};
