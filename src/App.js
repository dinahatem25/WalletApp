import React, { useEffect, useState } from 'react';
import './index.css';
import { Avatar, Button, List, Skeleton, Card } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom'; // Import React Router components
import EditPage from './EditPage'; // Correct the import path
import Transaction from './TransactionPage';

const initialCount = 3; // Number of initial entries to fetch
const dataUrl = `http://localhost:3000/api/users`;

const App = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0); // Keep track of the offset for fetching more data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${dataUrl}?offset=${offset}&limit=${initialCount}`)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res);
        setList(res);
      });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered-container">
              <Card title="User List" className="user-list-card">
                <List
                  className="demo-loadmore-list"
                  loading={initLoading}
                  itemLayout="horizontal"
                  dataSource={list}
                  renderItem={(item) => (
                    <Card.Grid key={item._id} style={{ width: '100%', textAlign: 'center' }}>
                      <Card title={item.name} extra={`Wallet Balance: ${item.walletBalance}`}>
                        <Skeleton avatar title={false} loading={item.loading} active>
                          {/* Add more details about the user here if needed */}
                          <Link to={`/edit/${item._id}`}>
                            <Button type="primary">Edit</Button>
                          </Link>
                          <Link to={`/transactions/${item.userId}`}>
                            <Button type="default">More</Button>
                          </Link>
                        </Skeleton>
                      </Card>
                    </Card.Grid>
                  )}
                />
              </Card>
            </div>
          }
        />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/transactions/:userId" element={<Transaction />} />
      </Routes>
    </Router>
  );
};

export default App;
