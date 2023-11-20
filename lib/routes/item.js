'use strict';

const express = require('express');
const ItemModel = require('../models/item');
const verifyAuthentication = require('../Auth/auth'); // Import the authentication middleware

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// POST /items - Create a new lost item
router.post('/', verifyAuthentication, async (req, res) => {
  const newItemData = { ...req.body, userEmail: req.userEmail };
  try {
    const newItem = new ItemModel(newItemData);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /items - Retrieve lost items belonging to the logged-in user
router.get('/', verifyAuthentication, async (req, res) => {
  try {
    const items = await ItemModel.find({ userEmail: req.userEmail });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /items/:id - Update a lost item (with authorization check)
router.put('/:id', verifyAuthentication, async (req, res) => {
  // Check if the item with :id belongs to the logged-in user (authorization)
  const itemId = req.params.id;
  const item = await ItemModel.findOne({ _id: itemId, userEmail: req.userEmail });
  if (!item) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Update the item
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(itemId, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /items/:id - Delete a lost item (with authorization check)
router.delete('/:id', verifyAuthentication, async (req, res) => {
  // Check if the item with :id belongs to the logged-in user (authorization)
  const itemId = req.params.id;
  const item = await ItemModel.findOne({ _id: itemId, userEmail: req.userEmail });
  if (!item) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Delete the item
  try {
    await ItemModel.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
