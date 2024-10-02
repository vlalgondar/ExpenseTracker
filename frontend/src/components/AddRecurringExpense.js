import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken, handleLogout } from './api';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function AddRecurringExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

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
        'http://127.0.0.1:8000/api/recurring-expenses/',
        {
          description,
          amount,
          start_date: startDate,
          frequency,
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
      setStartDate('');
      setFrequency('');
      setCategory('');
      // Optionally redirect or show success message
      alert('Recurring expense added successfully!');
    } catch (error) {
      console.error('Error adding recurring expense:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
        navigate('/login');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Recurring Expense
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
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="frequency-label">Frequency</InputLabel>
                  <Select
                    labelId="frequency-label"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    label="Frequency"
                  >
                    <MenuItem value="DAILY">Daily</MenuItem>
                    <MenuItem value="WEEKLY">Weekly</MenuItem>
                    <MenuItem value="BIWEEKLY">Biweekly</MenuItem>
                    <MenuItem value="MONTHLY">Monthly</MenuItem>
                    <MenuItem value="YEARLY">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Recurring Expense
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddRecurringExpense;
