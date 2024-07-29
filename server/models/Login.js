const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { type: String, required: true }},
  { collection: 'logins' });

module.exports = mongoose.model('Login', LoginSchema);
