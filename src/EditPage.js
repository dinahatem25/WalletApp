import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button } from 'antd';

const EditPage = () => {
  const { id } = useParams(); // Get the index from the URL parameter
  const [adjustmentAmount, setAdjustmentAmount] = useState(0); // State variable to hold user input

  const handleInputChange = (e) => {
    // Update the state variable when the user enters input
    setAdjustmentAmount(Number(e.target.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Make an HTTP POST request to the API endpoint
    try {
      console.log(adjustmentAmount);
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
        // Handle success, e.g., show a success message or update the UI
        console.log(data.message);
      } else {
        // Handle error response from the API
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
            placeholder="Edit your item here"
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
