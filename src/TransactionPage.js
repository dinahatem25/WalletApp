import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TransactionsPage = () => {
  const { id } = useParams().id; // Get the index from the URL parameter
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to the API endpoint
    const fetchTransactions = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/transactions?id=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
      
          // ... rest of your code ...
        } catch (error) {
          console.error('Error retrieving transactions:', error);
        }
      };

    fetchTransactions();
  }, [id]);

  return (
    <div>
      <h1>Transactions Page</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {/* Render transaction data here */}
            Transaction ID: {transaction._id}, Amount: {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
