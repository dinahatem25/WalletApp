import React, { useEffect, useState } from 'react';
import './index.css';
import { Avatar, Button, Card, List, Skeleton } from 'antd';

const count = 3;
const dataUrl = `http://localhost:3000/api/users`;

const App = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        if (response.ok) {
          const res = await response.json();
          setInitLoading(false);
          setData(res);
          setList(res);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onLoadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(dataUrl);
      if (response.ok) {
        const res = await response.json();
        const newData = data.concat(res);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop for better UI experience
        window.dispatchEvent(new Event('resize'));
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  return (
    <div>
      <h1>User List</h1>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Card>
              <Skeleton avatar title={false} loading={item.loading} active>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Avatar src={item.picture.large} />
                    <span style={{ marginLeft: '8px' }}>{item.name?.last}</span>
                  </div>
                  <div>
                    <span>Wallet Balance: {item.walletBalance}</span>
                    <Button type="primary" style={{ marginLeft: '8px' }}>Edit</Button>
                    <Button type="default" style={{ marginLeft: '8px' }}>More</Button>
                  </div>
                </div>
              </Skeleton>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
