'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { start } = require('./lib/server.js');

const PORT = process.env.PORT || 3001;

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process on connection error
});

// Once connected, start the server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  start(PORT);
});
