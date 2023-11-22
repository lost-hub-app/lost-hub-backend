'use strict';

const express = require('express');
const ItemModel = require('../models/item');

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

router.get('/:email', handleGet);
router.post('/', handlePost);
router.put('/:id', handlePut);
router.delete('/:id', handleDelete);

async function handleGet(request, response) {
  try {
    console.log('Handling GET request for /items');

    // Assuming the email is in request.body.email
    const { email } = request.params;

    // Add a filter to retrieve only items with the specified email
    const items = await ItemModel.find({ email });

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
