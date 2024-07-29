const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  _id: { type: Number, default: 1 }, // Ensure _id is explicitly set to 1
  message: String,
  date: { type: Date, default: Date.now }}, { versionKey: false },
  { collection: 'dashboards' });

module.exports = mongoose.model('Dashboard', DashboardSchema);
