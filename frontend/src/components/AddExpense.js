import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from './api';  // Import your token utility

function AddExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAuthToken();
    if (!token) {
      window.location.href = '/';  // Redirect to login if not authorized
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/expenses/', {
        description,
        amount,
        date,
        category,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Expense added:', response.data);
      // Clear form
      setDescription('');
      setAmount('');
      setDate('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error);
      if (error.response && error.response.status === 401) {
        window.location.href = '/';  // Redirect to login if unauthorized
      }
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
