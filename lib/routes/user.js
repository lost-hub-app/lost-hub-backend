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
    console.log('Handling POST request for /users', request.body);

    const { email } = request.body;

    // Check if the user with the provided email already exists
    const existingUser = await UserModel.findOne({ email });

    console.log("HERES THE EXISTING USER", existingUser)

    if (existingUser) {
      // User is in the database
      response.status(200).json({ message: 'USER IS IN THE DATABASE' });
    } else {
      // User is not in the database, save the new user
      console.log("I GOT TO THE ELSE PART")
      request.body.city = "Seattle, WA";
      const newUser = new UserModel(request.body);
      console.log("HERES THE NEW USER", newUser)
      const savedUser = await newUser.save();
      console.log('HERES THE SAVED USER', savedUser);
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
