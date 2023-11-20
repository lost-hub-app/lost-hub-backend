'use strict';

const express = require('express');
const cors = require('cors');
const itemRouter = require('./routes/item');
const uploadRouter = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
console.log('Setting up /items route');
app.use('/items', itemRouter);
app.use('/upload', uploadRouter);

app.get('/test', (req, res) => {
  res.send('Test request received');
});


// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});

// Wildcard route - should be at the end
app.get('*', (req, res) => {
  console.log("HERE'S THE GET REQUEST", req.body);
  res.status(404).send('Resource not found');
});

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`REST server is running on ${PORT}`);
    });
  },
};
