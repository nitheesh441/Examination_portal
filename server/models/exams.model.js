const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  courseCode: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const examsSchema = new mongoose.Schema({
  examId: { type: String,required: true, unique: true},
  examName: { type: String, required: true},
  subjects: [subjectSchema],
},{ versionKey: false }, { collection: 'exams' });

module.exports = mongoose.model('Exams', examsSchema);
