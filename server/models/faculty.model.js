
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    staffid: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
  dob: { type: Date },
  fatherName: { type: String },
  
  address: { type: String },
  mobile: { type: String },
  parentNo: { type: String },
  bloodGroup: { type: String },
  dept: { type: String }
}, { versionKey: false },
{ collection: 'faculties' });

module.exports = mongoose.model('Faculty', facultySchema);

