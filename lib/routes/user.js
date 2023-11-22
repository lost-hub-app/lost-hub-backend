'use strict';

const express = require('express');
const UserModel = require('../models/user');

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// router.get('/:email', handleGet);
router.post('/', handlePost);
router.put('/:id', handlePut);
router.delete('/:id', handleDelete);

async function handlePost(request, response) {
  try {
    const { email } = request.body;

    // Check if the user with the provided email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // User is in the database
      response.status(200).json(existingUser);
    } else {
      // User is not in the database, save the new user
      request.body.city = "Seattle, WA";
      const newUser = new UserModel(request.body);
      const savedUser = await newUser.save();
      response.status(201).json(savedUser);
    }
  } catch (error) {
    response.status(500).json({ message: 'Error saving user' });
  }
}


async function handlePut(request, response) {
  try {
    const { email } = request.params;
    const updatedUser = await UserModel.findByIdAndUpdate(email, request.body, {
      new: true,
    });
    response.status(200).json(updatedUser);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function handleDelete(request, response) {
  try {
    const { email } = request.params;
    await UserModel.findByIdAndDelete(email);
    response.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

module.exports = router;
