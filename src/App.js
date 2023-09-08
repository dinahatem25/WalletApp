import React, { useEffect, useState } from 'react';
import './index.css';
import { Button, Card, List, Skeleton } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import EditPage from './EditPage';
import TransactionPage from './TransactionPage';

const initialCount = 3;
const dataUrl = 'http://localhost:3000/api/users';

const App = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${dataUrl}?offset=${offset}&limit=${initialCount}`)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
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
                          <Link to={`/edit/${item._id}`}>
                            <Button type="primary">Edit</Button>
                          </Link>
                          <Link to={`/transactions/${item._id}`}>
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
        <Route path="/transactions/:id" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
