'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  city: { type: String, required: true },
  picture: { type: String}
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
