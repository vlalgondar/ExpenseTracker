import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken, handleLogout } from './api';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Container, Button } from '@mui/material';

function RecurringExpenseList() {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecurringExpenses = async () => {
      const token = await getAuthToken();
      if (!token) {
        handleLogout();
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recurring-expenses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecurringExpenses(response.data);
      } catch (error) {
        console.error('Error fetching recurring expenses:', error);
        if (error.response && error.response.status === 401) {
          handleLogout();
          navigate('/login');
        }
      }
    };

    fetchRecurringExpenses();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = await getAuthToken();
    if (!token) {
      handleLogout();
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/recurring-expenses/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecurringExpenses(recurringExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error('Error deleting recurring expense:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
        navigate('/login');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recurring Expenses
      </Typography>
      <Grid container spacing={2}>
        {recurringExpenses.map((expense) => (
          <Grid item xs={12} key={expense.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{expense.description}</Typography>
                <Typography color="textSecondary">
                  ${expense.amount} | Starts: {expense.start_date} | Frequency: {expense.frequency}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(expense.id)}
                  style={{ marginTop: '10px' }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecurringExpenseList;
