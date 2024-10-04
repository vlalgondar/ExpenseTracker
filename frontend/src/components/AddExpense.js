// src/components/AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken, handleLogout } from './api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardContent, Grid, Container } from '@mui/material';

function AddExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAuthToken();
    if (!token) {
      handleLogout();
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/expenses/`,
        {
          description,
          amount,
          date,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Clear form
      setDescription('');
      setAmount('');
      setDate('');
      setCategory('');
      // Optionally redirect or show success message
    } catch (error) {
      console.error('Error adding expense:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
        navigate('/login');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Expense
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddExpense;