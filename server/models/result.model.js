// models/Result.js
const mongoose = require('mongoose');

const studentResultSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  fullName:{ type: String, required: true },
  score: { type: Number, required: true },
  outOf: { type: Number, required: true },
  gradePoint: { type: Number },
  grade: { type: String },
  isAbsent: { type: Boolean, default: false }
});

const subjectResultSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  courseCode: { type: String,required: true },
  students: [studentResultSchema]
});

const resultSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  subjects: [subjectResultSchema]
},{ versionKey: false }, { collection: 'results' });

module.exports = mongoose.model('Result', resultSchema);






