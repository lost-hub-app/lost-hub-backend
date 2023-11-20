'use strict';

const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');

// Fetch user profile
router.get('/:auth0Id', async (req, res) => { 
  try {
    const auth0Id = req.params.auth0Id; 
    const user = await UserModel.findOne({ auth0Id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update user profile
router.put('/update', async (req, res) => {
  try {
    const { auth0Id, ...updateData } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate({ auth0Id }, updateData, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});

module.exports = router;
