'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true }
  // The items array is going to be left because the relationship will be handled in the item
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
