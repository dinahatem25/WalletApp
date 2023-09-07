// models/user.js

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0, // Default wallet balance is 0
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
