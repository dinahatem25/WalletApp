import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Modal } from 'antd';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [userData, setUserData] = useState(null); // Initialize as null
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch user data here
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error retrieving user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    setAdjustmentAmount(Number(e.target.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/adjust-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          adjustmentAmount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        // Reload the homepage and navigate back to it
        window.location.href = '/';
      } else {
        const data = await response.json();
        const errorText = data.error || 'An error occurred.';
        setErrorMessage(errorText);
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Error adjusting wallet balance:', error);
    }
  };

  const handleModalOk = () => {
    setErrorModalVisible(false);
  };

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.name}'s Wallet</h1>
          <p>Balance: {userData.walletBalance}</p>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card title="Update Wallet Balance" style={{ width: 300 }}>
          <form onSubmit={handleFormSubmit}>
            <Input
              type="number"
              placeholder="Enter adjustment amount"
              value={adjustmentAmount}
              onChange={handleInputChange}
            />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>
      <Modal
        title="Error"
        visible={errorModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        {errorMessage}
      </Modal>
    </div>
  );
};

export default EditPage;
