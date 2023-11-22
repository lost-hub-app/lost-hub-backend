'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  itemName: { type: String, required: true },
  image: { type: String },
  location: { type: String },
  description: { type: String, required: true },
  email: { type: String, required: true },
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
