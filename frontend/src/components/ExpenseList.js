// src/components/ExpenseList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken, handleLogout } from './api';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
} from '@mui/material';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = await getAuthToken();
      if (!token) {
        handleLogout();
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/expenses/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        if (error.response && error.response.status === 401) {
          handleLogout();
          navigate('/login');
        }
      }
    };

    fetchExpenses();
  }, [navigate]);

  const handleFilterAndSort = () => {
    let updatedExpenses = expenses;

    // Filter by category
    if (filterCategory) {
      updatedExpenses = updatedExpenses.filter(
        (expense) => expense.category === filterCategory
      );
    }

    // Sort by date
    updatedExpenses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredExpenses(updatedExpenses);
  };

  const handleReset = () => {
    setFilteredExpenses(expenses);
    setFilterCategory('');
    setSortOrder('desc');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Expense List
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="filter-category-label">Filter by Category</InputLabel>
            <Select
              labelId="filter-category-label"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              label="Filter by Category"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {/* Map through unique categories */}
              {[...new Set(expenses.map((expense) => expense.category))].map(
                (category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="sort-order-label">Sort by Date</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Sort by Date"
            >
              <MenuItem value="desc">Newest First</MenuItem>
              <MenuItem value="asc">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterAndSort}
            fullWidth
          >
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={handleReset} fullWidth>
            Reset
          </Button>
        </Grid>
      </Grid>

      {/* Expense List */}
      <Grid container spacing={2}>
        {filteredExpenses.map((expense) => (
          <Grid item xs={12} key={expense.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{expense.description}</Typography>
                <Typography color="textSecondary">
                  ${expense.amount} | {expense.date} | {expense.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExpenseList;
