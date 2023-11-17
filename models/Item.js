'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  categoryID: { type: Schema.Types.ObjectId, ref: 'Category' },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['lost', 'found'], required: true },
  photoURL: String
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
