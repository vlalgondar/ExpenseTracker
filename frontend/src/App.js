// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import theme from './theme';
import Login from './components/Login';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import Insights from './components/Insights';
import Budget from './components/Budget';
import { getAuthToken, handleLogout } from './components/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken();
      setIsLoggedIn(!!token);
    };
    checkAuth();
  }, []);

  const handleLogoutAndUpdateState = () => {
    handleLogout();
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isLoggedIn ? (
          <>
            <AppBar position="static" color="transparent" elevation={0}>
              <Container>
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    style={{
                      flexGrow: 1,
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                    }}
                  >
                    ExpenseTracker
                  </Typography>
                  <Button color="primary" component={Link} to="/expenses">
                    Expenses
                  </Button>
                  <Button color="primary" component={Link} to="/add-expense">
                    Add Expense
                  </Button>
                  <Button color="primary" component={Link} to="/insights">
                    Insights
                  </Button>
                  <Button color="primary" component={Link} to="/budget">
                    Budget
                  </Button>
                  <Button color="primary" onClick={handleLogoutAndUpdateState}>
                    Logout
                  </Button>
                </Toolbar>
              </Container>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
              <Routes>
                <Route path="/expenses" element={<ExpenseList />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/" element={<Navigate to="/expenses" />} />
                <Route path="*" element={<Navigate to="/expenses" />} />
              </Routes>
            </Container>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
