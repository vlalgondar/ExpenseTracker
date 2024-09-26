// src/components/Insights.js
import React, { useEffect, useState } from 'react';
import { getAuthToken } from './api';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Insights() {
  const [expenses, setExpenses] = useState([]);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalWeekly, setTotalWeekly] = useState(0);
  const [totalDaily, setTotalDaily] = useState(0);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAuthToken();
      if (!token) {
        window.location.href = '/';
        return;
      }

      try {
        // Fetch expenses
        const expensesResponse = await axios.get('http://127.0.0.1:8000/api/expenses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(expensesResponse.data);
        calculateTotals(expensesResponse.data);

        // Fetch budget
        const budgetResponse = await axios.get('http://127.0.0.1:8000/api/budgets/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (budgetResponse.data.length > 0) {
          setBudget(budgetResponse.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotals = (expensesData) => {
    const today = new Date();
    let monthlyTotal = 0;
    let weeklyTotal = 0;
    let dailyTotal = 0;

    expensesData.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const timeDiff = today - expenseDate;
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      if (expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear()) {
        monthlyTotal += parseFloat(expense.amount);
      }
      if (dayDiff <= 7) {
        weeklyTotal += parseFloat(expense.amount);
      }
      if (expenseDate.toDateString() === today.toDateString()) {
        dailyTotal += parseFloat(expense.amount);
      }
    });

    setTotalMonthly(monthlyTotal);
    setTotalWeekly(weeklyTotal);
    setTotalDaily(dailyTotal);
  };

  // Prepare data for the line chart (Expense History)
  const lineChartData = {
    labels: expenses.map((expense) => expense.date),
    datasets: [
      {
        label: 'Expenses Over Time',
        data: expenses.map((expense) => expense.amount),
        fill: false,
        borderColor: '#3f51b5',
      },
    ],
  };

  // Prepare data for the pie chart (Expenses by Category)
  const categoryData = {};
  expenses.forEach((expense) => {
    if (expense.category) {
      categoryData[expense.category] = (categoryData[expense.category] || 0) + parseFloat(expense.amount);
    }
  });

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#81C784', '#BA68C8'],
      },
    ],
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Insights
      </Typography>
      <Grid container spacing={3}>
        {/* Total Monthly Expense */}
        <Grid item xs={12} sm={4}>
          <Card
            style={{
              backgroundColor: budget && totalMonthly > budget.amount ? '#ffcccc' : '#ccffcc',
            }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Monthly Expense
              </Typography>
              <Typography variant="h5">${totalMonthly.toFixed(2)}</Typography>
              {budget && (
                <Typography variant="body2" color="textSecondary">
                  Budget: ${budget.amount}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Total Weekly Expense */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Weekly Expense
              </Typography>
              <Typography variant="h5">${totalWeekly.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Total Daily Expense */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Daily Expense
              </Typography>
              <Typography variant="h5">${totalDaily.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Expense History Chart */}
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Expense History
          </Typography>
          <Line data={lineChartData} />
        </CardContent>
      </Card>

      {/* Expenses by Category Pie Chart */}
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Expenses by Category
          </Typography>
          <Pie data={pieChartData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Insights;
