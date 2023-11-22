'use strict';

const express = require('express');
const ItemModel = require('../models/item');

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

router.get('/', handleGet);
router.post('/', handlePost);
router.put('/:id', handlePut);
router.delete('/:id', handleDelete);
router.post('/:id/notes', handleNotes);

async function handleNotes(request, response) {
  const { id } = request.params;
  const { user, text } = request.body; 

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { $push: { notes: { user, text } } }, 
    );
    if (updatedItem) {
      response.status(200).json(updatedItem);
    } else {
      response.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function handleGet(request, response) {
  try {
    console.log('Handling GET request for /items');

    // Add a filter to retrieve only items with the specified email
    const items = await ItemModel.find({});

    response.status(200).json(items);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}


async function handlePost(request, response) {
  try {
    console.log('Handling POST request for /items', request.body);
    const newItem = new ItemModel(request.body);
    const savedItem = await newItem.save();
    response.status(201).json(savedItem);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function handlePut(request, response) {
  try {
    const { id } = request.params;
    const updatedItem = await ItemModel.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.status(200).json(updatedItem);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function handleDelete(request, response) {
  try {
    const { id } = request.params;
    await ItemModel.findByIdAndDelete(id);
    response.status(200).json({ message: 'Item successfully deleted' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

module.exports = router;
