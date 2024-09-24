import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from './api.js';  // Import your token logic

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = await getAuthToken();
      if (!token) {
        console.error('Unable to get access token');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/expenses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} - {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
