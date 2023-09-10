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
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Transactions Page</h1>
      <div className="d-flex justify-content-center">
        <div className="card">
          <div className="card-body">
            <ul className="list-group">
              {transactions.map((transaction) => (
                <li key={transaction._id} className="list-group-item">
                  <strong>Date:</strong> {new Date(transaction.createdAt).toLocaleDateString()}, <strong>Amount:</strong> {transaction.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
