'use strict';

const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');

// Fetch user profile
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log('User found:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update user profile
router.put('/update', async (req, res) => {
  try {
    console.log('Received update data:', req.body);
    const { auth0Id, ...updateData } = req.body;
    
    // Use auth0Id for querying the database
    const updatedUser = await UserModel.findOneAndUpdate(
      { auth0Id }, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('User not found or update failed');
    }

    console.log('User updated:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});
module.exports = router;
