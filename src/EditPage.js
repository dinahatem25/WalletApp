import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button } from 'antd';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);

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
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error adjusting wallet balance:', error);
    }
  };

  return (
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
  );
};

export default EditPage;
