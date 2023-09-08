const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./User');
const Transaction = require('./Transaction');

const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://walletUser:DinaHatem321!@cluster0.ehovfo7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware for handling JSON data
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',
}));

app.get('/api/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, 'name walletBalance'); // Only select name and walletBalance fields

    // Return the list of users as a JSON response
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Oops, something went wrong!' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, walletBalance } = req.body; // Assuming you're sending user data in the request body

    // Create a new User instance
    const newUser = new User({ name, walletBalance });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Middleware for handling JSON data

app.use(cors({
  origin: 'http://localhost:3001',
}));

// Define a constant for the maximum adjustment amount
const MAX_ADJUSTMENT_AMOUNT = 1000000; // You can adjust this value as needed

app.post('/api/adjust-balance', async (req, res) => {
  try {
    const { userId, adjustmentAmount } = req.body;

    // Validate data types
    if (typeof userId !== 'string' || typeof adjustmentAmount !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Check if a user with the provided ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate adjustment amount range
    if (adjustmentAmount < -MAX_ADJUSTMENT_AMOUNT || adjustmentAmount > MAX_ADJUSTMENT_AMOUNT) {
      return res.status(400).json({ error: 'Adjustment amount out of range' });
    }

    // Calculate the new balance
    const newBalance = user.walletBalance + adjustmentAmount;

    // Check if the new balance would be negative for deductions
    if (newBalance < 0) {
      return res.status(400).json({ error: 'Insufficient balance for deduction' });
    }

    // Update the user's wallet balance in the database
    user.walletBalance = newBalance;
    await user.save();

    // Create a new transaction record
    const transaction = new Transaction({
      userId: user._id,
      amount: adjustmentAmount,
      type: 'adjustment',
    });

    // Save the transaction to the database
    await transaction.save();

    // Return a success response with the updated wallet balance
    res.json({ message: 'Wallet balance adjusted successfully', updatedBalance: user.walletBalance });
  } catch (error) {
    console.error('Error adjusting wallet balance:', error);
    res.status(500).json({ error: 'Oops, something went wrong!' });
  }
});


app.get('/api/transactions', async (req, res) => {
  try {
    const userId = req.query.id;
    // Find the user by ID in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all transactions associated with the user from the database
    const transactions = await Transaction.find({ userId });

    // Return the list of transactions as a JSON response
    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ error: 'Oops, something went wrong!' });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});