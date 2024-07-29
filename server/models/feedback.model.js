const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userType: { type: String, required: true },
  feedbackType: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date,required: true  }}, { versionKey: false },
  { collection: 'feedbacks' });

module.exports = mongoose.model('Feedback', feedbackSchema);
