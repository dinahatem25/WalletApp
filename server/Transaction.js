
const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['adjustment'], // You can add more transaction types if needed
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
