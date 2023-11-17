'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  city: String,
  createdItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  foundItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  matchedItems: [{
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
