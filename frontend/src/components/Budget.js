import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from './api';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';

function Budget() {
  const [budget, setBudget] = useState(null);
  const [amount, setAmount] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 

  useEffect(() => {
    const fetchBudget = async () => {
      const token = await getAuthToken();
      if (!token) {
        window.location.href = '/';
        return;
      }

      try {
        const response = await axios.get('${API_URL}/api/budgets/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length > 0) {
          setBudget(response.data[0]);
          setAmount(response.data[0].amount);
        }
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    fetchBudget();
  }, []);

  const handleSave = async () => {
    const token = await getAuthToken();
    if (!token) {
      window.location.href = '/';
      return;
    }

    try {
      if (budget) {
        // Update existing budget
        await axios.put(`${API_URL}/api/budgets/${budget.id}/`, { amount }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new budget
        const response = await axios.post('${API_URL}/api/budgets/', { amount }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBudget(response.data);
      }
      alert('Budget saved successfully!');
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Set Your Monthly Budget
      </Typography>
      <Card>
        <CardContent>
          <TextField
            label="Budget Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginLeft: '20px' }}>
            Save Budget
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Budget;