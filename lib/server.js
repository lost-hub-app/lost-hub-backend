"use strict";

console.log("Hello World");

const express = require("express");
const cors = require("cors");
const itemRouter = require('./routes/item.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/items', itemRouter);

// Routes
app.get("/test", (req, res) => {
  res.send("Test request received");
});

app.get("*", (req, res) => {
  res.status(404).send("Resource not found");
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log('REST server is running!');
    });
  },
};