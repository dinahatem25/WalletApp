import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TransactionPage = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/transactions?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Error retrieving transactions:', response.statusText);
        }
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
            Transaction ID: {transaction._id}, Amount: {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionPage;
