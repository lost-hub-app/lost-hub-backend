"use strict";

console.log("Hello World");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Models
const User = require("./models/user");
const Item = require("./models/item");
const Category = require("./models/Category");

// Auth middleware 
const verifyUser = require("./auth");

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

// Implementing CRUD operations for items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Resource not found");
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
