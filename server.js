"use strict";

console.log("Hello World");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Models
const User = require("./models/User");
const Item = require("./models/Item");
const Category = require("./models/Category");

// Auth middleware 
// const verifyUser = require("./auth");

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection.error:"));
db.once("open", () => {
  console.log("Mongoose is connected to MongoDB");
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
// app.use(verifyUser);

// Routes
app.get("/test", (req, res) => {
  res.send("Test request received");
});

// Placeholder for the LostHub functionality
app.get("/items", getItems);
app.post("/items", postItem);
app.delete("/items/:id", deleteItem);
app.put("/items/:id", putItem);

async function getItems(req, res, next) {
  // Your implementation here
}

async function postItem(req, res, next) {
  // Your implementation here
}

async function deleteItem(req, res, next) {
  // Your implementation here
}

async function putItem(req, res, next) {
  // Your implementation here
}

app.get("*", (req, res) => {
  res.status(404).send("Resource not found");
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
