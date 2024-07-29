
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dob: { type: Date },
  fatherName: { type: String },
  motherName: { type: String },
  address: { type: String },
  mobile: { type: String },
  parentNo: { type: String },
  bloodGroup: { type: String },
  photo: { type: String }, // URL to student's photo
  course: { type: String }
}, { versionKey: false },
{ collection: 'students' });

module.exports = mongoose.model('Student', studentSchema);

