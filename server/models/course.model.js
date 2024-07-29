const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    enum: ['CORE', 'ELECTIVE'], // Example of course types (you can add more as needed)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }},{ versionKey: false },
  { collection: 'courses' });

module.exports = mongoose.model('Course', CourseSchema);

