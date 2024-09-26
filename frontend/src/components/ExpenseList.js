import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from './api';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = await getAuthToken();
      if (!token) {
        window.location.href = '/';
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/expenses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSort = () => {
    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    setFilteredExpenses(sortedExpenses);
  };

  const handleFilter = () => {
    const filtered = expenses.filter((expense) =>
      filterCategory ? expense.category === filterCategory : true
    );
    setFilteredExpenses(filtered);
  };

  const handleReset = () => {
    setFilteredExpenses(expenses);
    setFilterCategory('');
    setSortOrder('desc');
  };

  return (
    <div>
      <h2>Expense List</h2>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <FormControl style={{ marginRight: '20px' }}>
          <InputLabel id="filter-category-label">Filter by Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {/* Map through unique categories */}
            {[...new Set(expenses.map((expense) => expense.category))].map((category) => (
              <MenuItem value={category} key={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginRight: '20px' }}>
          <InputLabel id="sort-order-label">Sort by Date</InputLabel>
          <Select
            labelId="sort-order-label"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <MenuItem value="desc">Newest First</MenuItem>
            <MenuItem value="asc">Oldest First</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleFilter} style={{ marginRight: '10px' }}>
          Apply
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Expense List */}
      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} - {expense.date} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;