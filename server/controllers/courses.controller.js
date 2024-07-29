const Course = require("../models/course.model")

const testercourse = (req, res) => {
    return res.send("Hello From Courses!");
};
const CoursesGetController = async (req, res) => {
   
  
    try {
        const courses = await Course.find();
       
        res.status(200).json(courses);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };

  const Coursecode = async (req, res) => {
    const { courseCode } = req.body;
  
    try {
        const courses = await Course.find(courseCode);
        res.status(200).json(courses);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };
  const Subject = async (req, res) => {
    const { courseCode } = req.body;
    console.log(courseCode);
    try {
      const course = await Course.findOne({courseCode });
      if (course) {
        res.status(200).json({ courseName: course.courseName });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const CoursesAddController =  async (req, res) => {
    try {
      const { courseCode, courseName, courseType } = req.body;
      
      const newCourse = new Course({
      
        courseCode,
        courseName,
        courseType
       
      });
      await newCourse.save();
      res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to add course',error });
    }
  };
  const CoursesUpdateController =  async (req, res) => {
    const { _id,courseCode, courseName, courseType } = req.body;
    console.log(_id);
    try {
      const updatedCourse = await Course.findByIdAndUpdate({_id }, { courseCode,courseName, courseType }, { new: true });
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const CoursesDeleteController =  async (req, res) => {
    const { courseCode } = req.body;
    try {
      await Course.findOneAndDelete({ courseCode });
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
    testercourse,CoursesGetController,CoursesAddController,CoursesDeleteController,Coursecode,
    CoursesUpdateController,Subject
    
};