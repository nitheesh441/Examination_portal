const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  courseCode: { type: String, required: true },
  meetURL: { type: String, required: true },
  questionPaper: { type: String, required: true },
  pin: { type: String, required: true },
  submissions: [
    {
      studentId: {type: String, required: true },
      answerScript: { type: String, required: true },
      submittedAt: { type: Date, default: Date.now }
    }
  ]
});

const conductSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  subjects: [subjectSchema]
},{ versionKey: false }, { collection: 'conducts' });

const Conduct = mongoose.model('Conduct', conductSchema);

module.exports = Conduct;
