'use strict';

console.log("test");

require('dotenv').config();
const mongoose = require('mongoose');

// Assuming you've set DB_URL in your .env file to your MongoDB URI
mongoose.connect(process.env.DB_URL);

// Importing the models
const User = require('./models/user');
const Item = require('./models/item');
const Category = require('./models/Category');

async function seed() {
  // Seed Categories
  const electronics = new Category({ name: 'Electronics' });
  await electronics.save();
  console.log('Electronics category added to the DB');

  const books = new Category({ name: 'Books' });
  await books.save();
  console.log('Books category added to the DB');

  // Seed Users
  const user1 = new User({
    username: 'johndoe',
    password: 'hashed_password', // Make sure to hash the password in production
    email: 'john@example.com',
    city: 'New York'
  });
  await user1.save();
  console.log('User John Doe added to the DB');

  // Seed Items
  await Item.create({
    description: 'Lost MacBook Pro',
    location: 'Central Park',
    date: new Date(),
    categoryID: electronics._id,
    userID: user1._id,
    status: 'lost',
    photoURL: 'http://example.com/macbook.jpg'
  });
  console.log('Lost MacBook Pro was added to the DB');

  await Item.create({
    description: 'Found Kindle Reader',
    location: 'Subway Station',
    date: new Date(),
    categoryID: electronics._id,
    userID: user1._id,
    status: 'found',
    photoURL: 'http://example.com/kindle.jpg'
  });
  console.log('Found Kindle Reader was added to the DB');

  // Disconnect from the database after seeding
  mongoose.disconnect();
}

seed();
