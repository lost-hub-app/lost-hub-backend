'use strict';

const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');

// Fetch user profile
router.get('/_id', async (req, res) => {
  try {
    console.log('Fetching user profile for Auth0 ID:', req.params._id); // Log the Auth0 ID being requested
    const _id = req.params._id;
    const user = await UserModel.findOne({ _id });
    if (!user) {
      console.log('User not found for Auth0 ID:', _id); // Log if user not found
      return res.status(404).send('User not found');
    }
    console.log('User found:', user); // Log the found user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error); // Log any errors
    res.status(500).send('Internal Server Error');
  }
});

// Update user profile
router.put('/update', async (req, res) => {
  try {
    console.log('Received update data:', req.body); // Log the entire request body
    console.log('Updating user profile for Auth0 ID:', req.body._id); // Log the Auth0 ID and update data
    const { _id, ...updateData } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate({ _id }, updateData, { new: true });
    console.log('User updated:', updatedUser); // Log the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error); // Log any errors
    res.status(500).send('Error updating user');
  }
});

module.exports = router;
