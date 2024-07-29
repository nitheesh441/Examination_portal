const Exams = require("../models/exams.model")

const testerexams = (req, res) => {
  return res.send("Hello From Exams!");
};
const generateExamId = async () => {
  const lastExam = await Exams.findOne({}, {}, { sort: { 'examId': -1 } });
  let lastId = 0;
  if (lastExam) {
    const lastExamId = lastExam.examId;
    lastId = parseInt(lastExamId.substr(1)); // Extract the numeric part of the last examId
  }
  const newId = (lastId + 1).toString().padStart(3, '0'); // Generate the next ID with leading zeros
  return `E${newId}`;
};

const ExamsGetStudentController = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const exams = await Exams.find({ 'subjects.date': { $gte: currentDate } });
    
    const upcomingExams = exams.map((exam) => ({
      ...exam._doc,
      subjects: exam.subjects.filter(subject =>{
        const subjectDate=new Date(subject.date);
        subjectDate.setHours(0,0,0,0);
        return subjectDate.getTime() >=currentDate.getTime();
      }), 
    }));
   
    res.status(200).json(upcomingExams);
 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const ExamsGetFacultyController = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const exams = await Exams.find({ 'subjects.date': { $gte: currentDate } });
    if(!exams){
    const upcomingExams = exams.map((exam) => ({
      ...exam._doc,
      subjects: exam.subjects.filter(subject =>{
        const subjectDate=new Date(subject.date);
        subjectDate.setHours(0,0,0,0);
        return subjectDate.getTime() >=currentDate.getTime();
      }), 
    }));
   
    res.status(200).json(upcomingExams);
  }
  else{
    const upcomingExams = await Exams.find();
    res.status(200).json(upcomingExams);
   
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const ExamsPostController = async (req, res) => {
  const { examName, subjects } = req.body;
  const examId = await generateExamId();
  console.log(examId, examName, subjects);

  if (!examName || !subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ error: 'Invalid exam data' });
  }

  const formatSubjects = (subjects) => {
    return subjects.map((subject) => {
      const date = new Date(subject.date);
      const formattedStartTime = new Date(date);
      formattedStartTime.setHours(...subject.startTime.split(':'));
      const formattedEndTime = new Date(date);
      formattedEndTime.setHours(...subject.endTime.split(':'));

      if (isNaN(date.getTime()) || isNaN(formattedStartTime.getTime()) || isNaN(formattedEndTime.getTime())) {
        return null;
      }

      return {
        subjectName: subject.subjectName,
        courseCode: subject.courseCode,
        date,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };
    });
  };

  const formattedSubjects = formatSubjects(subjects);

  if (formattedSubjects.some((subject) => !subject)) {
    return res.status(400).json({ error: 'Invalid date/time format in subjects' });
  }

  try {
    const existingExam = await Exams.findOne({ examName });

    if (existingExam) {
      // Add formatted subjects to existing exam
      existingExam.subjects.push(...formattedSubjects);
      const result = await existingExam.save();
      return res.status(200).json(result);
    } else {
      const newExam = new Exams({ examId, examName, subjects: formattedSubjects });
      const result = await newExam.save();
      res.status(201).json(result);
    }
  } catch (error) {
    console.error('Error saving exam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const ExamsSubUpdateController = async (req, res) => {
  console.log(req.body);
  const { examId, subjectId, updatedSubject } = req.body;
 

  // Validate examId, subjectId, and updatedSubject
  if (!examId || !subjectId || !updatedSubject) {
    return res.status(400).json({ error: 'Invalid data for subject update' });
  }

  // Validate/format date, startTime, and endTime in updatedSubject
  const date = new Date(updatedSubject.date);
  const formattedStartTime = new Date(date);
  formattedStartTime.setHours(...updatedSubject.startTime.split(':'));
  const formattedEndTime = new Date(date);
  formattedEndTime.setHours(...updatedSubject.endTime.split(':'));

  // Check if the formatted dates/times are valid
  if (isNaN(date.getTime()) || isNaN(formattedStartTime.getTime()) || isNaN(formattedEndTime.getTime())) {
    return res.status(400).json({ error: 'Invalid date/time format in updated subject' });
  }

  // Update the subject in the exam document in the database
  try {
    const updatedExam = await Exams.findOneAndUpdate(
      { _id: examId, 'subjects._id': subjectId },
      {
        $set: {
          'subjects.$.subjectName': updatedSubject.subjectName,
          'subjects.$.courseCode': updatedSubject.courseCode,
          'subjects.$.date': date,
          'subjects.$.startTime': formattedStartTime,
          'subjects.$.endTime': formattedEndTime,
        },
      },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam or subject not found' });
    }

    res.status(200).json(updatedExam);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};







const DeleteSubjectController = async (req, res) => {
  const { examId, subjectId } = req.body;

  if (!examId || !subjectId) {
    return res.status(400).json({ error: 'Invalid data for subject deletion' });
  }

  try {
    const updatedExam = await Exams.findOneAndUpdate(
      { _id: examId },
      { $pull: { subjects: { _id: subjectId } } },
      { new: true }
    );
    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam or subject not found' });
    }
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const DeleteExamController = async (req, res) => {
  const { examId } = req.body;
  const { _id } = req.body;
  console.log(_id);

  if (!examId) {
    return res.status(400).json({ error: 'Invalid exam ID' });
  }

  try {
    const deletedExam = await Exams.findByIdAndDelete(examId);
    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  testerexams, DeleteSubjectController, DeleteExamController,


  ExamsGetStudentController,ExamsGetFacultyController, ExamsPostController, ExamsSubUpdateController

};

  