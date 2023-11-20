'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { start } = require('./lib/server.js');

const PORT = process.env.PORT || 3001;
const MONGO_DB = process.env.MONGO_DB;
const db = mongoose.connection;

// Check for MongoDB connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Once connected, start the server
db.once('open', () => {
  console.log('Connected to MongoDB');
  start(PORT);
});

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_DB);
