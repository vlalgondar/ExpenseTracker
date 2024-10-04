// src/components/Insights.js
import React, { useEffect, useState } from 'react';
import { getAuthToken, handleLogout } from './api';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
  const [timeframe, setTimeframe] = useState('monthly');
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 
  

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAuthToken();
      if (!token) {
        handleLogout();
        navigate('/login');
        return;
      }

      try {
        // Fetch expenses
        const expensesResponse = await axios.get('${API_URL}/api/expenses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(expensesResponse.data);
        calculateTotals(expensesResponse.data);
        updateLineChartData(expensesResponse.data, timeframe);

        // Fetch budget
        const budgetResponse = await axios.get('${API_URL}/api/budgets/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (budgetResponse.data.length > 0) {
          setBudget(budgetResponse.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          handleLogout();
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const calculateTotals = (expensesData) => {
    const today = new Date();
    let monthlyTotal = 0;
    let weeklyTotal = 0;
    let dailyTotal = 0;

    expensesData.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const timeDiff = today - expenseDate;
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      if (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      ) {
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

  const updateLineChartData = (expensesData, selectedTimeframe) => {
    const groupedData = {};
    expensesData.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      let key;
      switch (selectedTimeframe) {
        case 'daily':
          key = expenseDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
          break;
        case 'monthly':
          key = `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`; // 'YYYY-M'
          break;
        case 'yearly':
          key = `${expenseDate.getFullYear()}`; // 'YYYY'
          break;
        default:
          key = expenseDate.toISOString().split('T')[0];
      }

      if (groupedData[key]) {
        groupedData[key] += parseFloat(expense.amount);
      } else {
        groupedData[key] = parseFloat(expense.amount);
      }
    });

    const sortedKeys = Object.keys(groupedData).sort();
    const data = sortedKeys.map((key) => groupedData[key]);

    setLineChartData({
      labels: sortedKeys,
      datasets: [
        {
          label: 'Expenses',
          data: data,
          fill: false,
          borderColor: '#3f51b5',
        },
      ],
    });
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
    updateLineChartData(expenses, event.target.value);
  };

  // Prepare data for the pie chart (Expenses by Category)
  const categoryData = {};
  expenses.forEach((expense) => {
    if (expense.category) {
      categoryData[expense.category] =
        (categoryData[expense.category] || 0) + parseFloat(expense.amount);
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Insights
      </Typography>
      <Grid container spacing={3}>
        {/* Total Expense Cards remain the same */}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {/* Expense History Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Expense History
              </Typography>
              <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: '20px' }}>
                <InputLabel id="timeframe-label">Timeframe</InputLabel>
                <Select
                  labelId="timeframe-label"
                  value={timeframe}
                  onChange={handleTimeframeChange}
                  label="Timeframe"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
              <div style={{ position: 'relative' }}>
                <Line
                  data={lineChartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Expenses by Category Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Expenses by Category
              </Typography>
              <div style={{ position: 'relative' }}>
                <Pie
                  data={pieChartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Insights;