
const Results = require("../models/result.model")
const Students = require("../models/student.model")
const Exams = require("../models/exams.model")
const testresults = (req, res) => {
    return res.send("Hello From results!");
};
const ExamNameController = async (req, res) => {
  const { examName } = req.body;

  try {
      const exams = await Exams.find(examName);
      res.status(200).json(exams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const ResultsGetController = async (req, res) => {
  const { rollNo } = req.body;


  try {
    if (!rollNo) {
      return res.status(400).json({ message: 'Roll number is required' });
    }

     const results = await Results.find({ "subjects.students.rollNo": rollNo });
    


    if (results.length === 0) {
      return res.status(404).json({ message: 'No Results Found' });
    }

    const studentResults = results.map(result => ({
      examName: result.examName,
      subjects: result.subjects.map(subject => {
        const student = subject.students.find(student => student.rollNo === rollNo);
        return {
          subject: subject.subject,
          courseCode:subject.courseCode,
          student
        };
      }).filter(subject => subject.student) 
    }));

    res.json(studentResults);
  } catch (error) {
    res.status(500).send(error);
  }
};
    const calculateGrade = (score, outOf) => {
      const percentage = (score / outOf) * 100;
      let grade = '';
      let gradePoint = percentage / 10;
    
      if (percentage >= 90) {
        grade = 'A+';
      } else if (percentage >= 80) {
        grade = 'A';
      } else if (percentage >= 70) {
        grade = 'B+';
      } else if (percentage >= 60) {
        grade = 'B';
      } else if (percentage >= 50) {
        grade = 'C+';
      } else if (percentage >= 40) {
        grade = 'C';
      } else {
        grade = 'F';
      }
    
      return { grade, gradePoint };
    };
    const StudentresultGetController = async (req, res) => {
      try {
          
          const student = await Students.find({},{_id:0,rollNo:1,fullName:1});
          if (!student) {
            return res.status(404).json({ message: 'Student not found' });
          }
      
          res.status(200).json(student);
        } catch (error) {
          console.error('Error fetching student profile:', error);
          res.status(500).json({ message: 'Error fetching student profile' });
        }
      };
    
      const ResultsPostController = async (req, res) => {
        const { examName, subjects } = req.body;
        console.log(examName,subjects);
       
      
        try {
          const processedSubjects = subjects.map(subject => {
            const processedStudents = subject.students.map(student => {
              let { grade, gradePoint } = { grade: 'ABS', gradePoint: null };
              if (!student.isAbsent) {
                ({ grade, gradePoint } = calculateGrade(student.score, student.outOf));
              }
      
              return {
                rollNo: student.rollNo,
                fullName: student.fullName,  // Make sure to include fullName if required
                score: student.score,
                outOf: student.outOf,
                grade,
                gradePoint,
                isAbsent: student.isAbsent
              };
            });
      
            return {
              subject: subject.subject,
              courseCode: subject.courseCode, // Include courseCode in the processedSubjects
              students: processedStudents
            };
          });
      
          const newResult = new Results({
            examName,
            subjects: processedSubjects
          });
      
          await newResult.save();
      
          res.json({ message: 'Results saved successfully', newResult });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
        }
      };
    
module.exports = {
    testresults,ResultsGetController,ResultsPostController,StudentresultGetController,ExamNameController
    
};