'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  itemName: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  // date: { type: Date, default: Date.now },
  // categoryID: { type: Schema.Types.ObjectId, ref: 'Category' },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
